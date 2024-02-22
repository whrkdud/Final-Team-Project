from sqlalchemy import create_engine
import pymysql
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from glob import glob
from datetime import datetime, timedelta
import requests
import math
from pytimekr import pytimekr

class PredictTraffic:
    def __init__(self):
        self.now = datetime.now()
        self.tomorrow = self.now + timedelta(days=1)
        self.now = self.now.strftime("%Y%m%d%H")
        self.tomorrow = self.tomorrow.strftime("%Y%m%d")+"23"
        self.daytype = "weekday"
        
        self.holi_service_key = api1
        self.traffic_key = api2
        self.conn = create_engine("mysql+pymysql://root:1234@localhost:3306/jeogi?charset=utf8")

    def requenstholiday(self):
        holi_service_key = self.holi_service_key
        url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'
        params ={'serviceKey' : holi_service_key,
                 'solYear' : self.now[:4],
                 'solMonth' : self.now[4:6],
                 "_type":"json",
                 "numOfRows":"9999"
                }
        response = requests.get(url, params=params)
        return response.json()

    def getHoliday(self):
        print("휴일 정보를 가져오는 중입니다.")
        
        kr_holidays = pytimekr.holidays(year=int(self.now[:4]))
        for holy in kr_holidays:
            if self.now[:8] == holy.strftime("%Y%m%d"):
                self.daytype = "holiday"

        if self.daytype != "holiday":
            t = 0
            while t<20:
                try:
                    holiday = self.requenstholiday()
                    break
                except:
                    if t==20:
                        print("주의!: 기념일 정보를 받아오지 못하였습니다")
                        break
                    continue

            for holy in holiday.get("response").get("body").get("items").get("item"):
                if self.now[:8] == holy.get("locdate"):
                    self.daytype = "holiday"

    def getTrafficData(self):
        print("교통정보를 가져오는 중입니다.")
        myKey = self.traffic_key
        
        now = self.now[:-2]
        nowHour = self.now[-2:]
        conn = self.conn
        
        beforeData = pd.read_sql("SELECT * FROM realtime_data", con=conn)
        nowData_raw = pd.DataFrame()
        
        if beforeData['stdDate'][:1][0] == now:
            last_hour = beforeData['hour'].astype(int).max()
            hours = range(last_hour + 1, int(nowHour) - 1)
        else:
            hours = range(0, int(nowHour)-1)

        for hour in hours:
            pageNo = "1"
            print(f"{hour}시 {pageNo} 진행 중")
            url = f"https://data.ex.co.kr/openapi/odtraffic/trafficAmountByUnit?key={myKey}&type=json&sumTmUnitTypeCode=3&stdHour={hour:02d}&numOfRows=99&pageNo={pageNo}"
            response = requests.get(url)
    
            pageSize = response.json().get("pageSize")
    
            nowData_temp = pd.DataFrame(response.json().get("list"))
    
            for page in range(2, pageSize + 1):
                print(f"{hour}시 {page}/{pageSize} 진행 중")
                url = f"https://data.ex.co.kr/openapi/odtraffic/trafficAmountByUnit?key={myKey}&type=json&sumTmUnitTypeCode=3&stdHour={hour:02d}&numOfRows=99&pageNo={page}"
                response = requests.get(url)
                temp = pd.DataFrame(response.json().get("list"))
                nowData_temp = pd.concat([nowData_temp, temp])
    
            nowData_raw = pd.concat([nowData_raw, nowData_temp],ignore_index=True)

        if len(hours) > 0:
            nowData_raw['trafficAmout'] = nowData_raw['trafficAmout'].astype(int)
            
            entrance_data = nowData_raw[nowData_raw['inoutName'] == '입구']
            exit_data = nowData_raw[nowData_raw['inoutName'] == '출구']
            
            entrance_traffic = entrance_data.groupby(['unitCode', 'stdHour'])['trafficAmout'].sum().reset_index()
            exit_traffic = exit_data.groupby(['unitCode', 'stdHour'])['trafficAmout'].sum().reset_index()
            
            traffic_data = pd.merge(entrance_traffic, exit_traffic, on=['stdHour', 'unitCode'])
            traffic_data = traffic_data.rename(columns={'trafficAmout_x':'in', 'trafficAmout_y':'out'})
            
            location = pd.read_sql(f"SELECT * FROM location", conn)
            
            traffic_data['unitCode'] = traffic_data['unitCode'].str.strip()
            
            
            result = []
        
            for loc_code, unit_code_list in zip(location['loc_code'], location['unit_code']):
                unit_codes = unit_code_list.split(',')
                for hour in traffic_data['stdHour'].unique():
                    in_sum = 0
                    out_sum = 0
                    for unit_code in unit_codes:
                        unit_code = unit_code.strip()
                        temp_df = traffic_data[(traffic_data['unitCode'] == unit_code) & (traffic_data['stdHour'] == hour)]
                        if not temp_df.empty:
                            in_sum += temp_df['in'].sum()
                            out_sum += temp_df['out'].sum()
                    result.append({
                        'loc_code': loc_code,
                        'hour': hour,
                        'in': in_sum,
                        'out': out_sum
                    })
            
            result_df = pd.DataFrame(result)
            result_df['stdDate'] = now
            result_df['move'] = result_df['in'] - result_df['out']
            result_df.sort_values(by='hour')
            result_df = result_df.reset_index()
            result_df = result_df.iloc[:,1:]
    
            if beforeData['stdDate'][:1][0] == now:
                result_df = pd.concat([beforeData,result_df])
    
            result_df.sort_values(by=["loc_code","hour"],inplace=True ,ignore_index=True)
            result_df.to_sql(name='realtime_data', con=conn, if_exists='replace', index=False)

    def getLocalData(self):
        print("지역에 대한 정보를 가져오는 중입니다.")
        
        conn = self.conn
        self.location = pd.read_sql(f"SELECT * FROM location",conn)

    def errorModify(self,errorData):
        now = self.now
        
        hours = [str(int(now[-2:])-4),str(int(now[-2:])-3),str(int(now[-2:])-2)]
        hours = [hour if len(hour) > 1 else '0'+hour for hour in hours]
        errorData = pd.concat([errorData, pd.DataFrame([
            {"inoutName":"입구","stdHour":hours[0]+"  ","trafficAmout":0},
            {"inoutName":"입구","stdHour":hours[1]+"  ","trafficAmout":0},
            {"inoutName":"입구","stdHour":hours[2]+"  ","trafficAmout":0},
            {"inoutName":"출구","stdHour":hours[0]+"  ","trafficAmout":0},
            {"inoutName":"출구","stdHour":hours[1]+"  ","trafficAmout":0},
            {"inoutName":"출구","stdHour":hours[2]+"  ","trafficAmout":0}
        ])])
        return errorData.groupby(["inoutName","stdHour"]).sum()

    def jamValid(self,jam):
        if jam <= -5:
            return 1
        elif jam <= 0:
            return 2
        elif jam <= 5:
            return 3
        elif jam <= 10:
            return 4
        else:
            return 5

    def predict(self):
        #getLocalData
        location = self.location
        #getTrafficData
        nowData_raw = pd.read_sql("SELECT * FROM realtime_data",self.conn)
    
        now = self.now
        conn = self.conn
        tomorrow = self.tomorrow
        daytype = self.daytype
        
        result = pd.DataFrame()
        location_cnt = len(location)
        
        for idx in range(location_cnt):
            target = location.iloc[idx,:].copy()
            cluster = target.cluster

            print(f"\n {target.loc_name} 지역 작업 중(진행도 : {idx+1} / {location_cnt})")
            
            result_temp = pd.DataFrame([{"loc_code":"0","in":0,"out":0}])
            result_temp["loc_code"] = target["loc_code"]
            
            if cluster != None:
                for in_out_ko, in_out_en in [["입구","in"],["출구","out"]]:
                    model = load_model(glob(f".\\new_models\\{cluster}_{in_out_en}_{daytype}_*")[0], compile=False)
                    try:
                        temp_max = int(glob(f".\\new_models\\{cluster}_{in_out_en}_{daytype}_*")[0].split("_")[-1][:-3])
                    except:
                        temp_max = nowData_raw.loc[nowData_raw["loc_code"] == target.loc_code,in_out_en].max()
                        
                    temp = np.array(nowData_raw.loc[nowData_raw["loc_code"] == target.loc_code,in_out_en][-3:]).reshape(1,3,1)
                    temp = temp/temp_max
            
                    if in_out_ko == "입구":
                        prepareData = []
                        for idx in range(len(nowData_raw)-2):
                            prepareData.append(nowData_raw[in_out_en][idx:idx+3])
                        prepareData = np.array(prepareData).reshape(-1,3,1)
                        model.predict(prepareData, verbose=0)
                        for date in [now[:-2],tomorrow[:-2]]:
                            result_temp["date"]=date
                            if date == now[:-2]:
                                result_temp["hour"]=int(now[-2:])-1
                                result_temp[in_out_en] = math.ceil((abs(model.predict(temp, verbose=0))*temp_max)[0][0])
                                result = pd.concat([result, result_temp], ignore_index=True)
                                temp = np.append(temp[0][1:],result_temp[in_out_en]/temp_max).reshape(1,3,1)
                                for hour in range(int(now[-2:]),24):
                                    result_temp["hour"]=hour
                                    result_temp[in_out_en] = math.ceil((abs(model.predict(temp, verbose=0))*temp_max)[0][0])
                                    result = pd.concat([result, result_temp], ignore_index=True)
                                    temp = np.append(temp[0][1:],result_temp[in_out_en]/temp_max).reshape(1,3,1)
                            else:
                                for hour in range(0,24):
                                    result_temp["hour"]=hour
                                    result_temp[in_out_en] = math.ceil((abs(model.predict(temp, verbose=0))*temp_max)[0][0])
                                    result = pd.concat([result, result_temp], ignore_index=True)
                                    temp = np.append(temp[0][1:],result_temp[in_out_en]/temp_max).reshape(1,3,1)
                    else:
                        prepareData = []
                        for idx in range(len(nowData_raw)-2):
                            prepareData.append(nowData_raw[in_out_en][idx:idx+3])
                        prepareData = np.array(prepareData).reshape(-1,3,1)
                        model.predict(prepareData, verbose=0)
                        for date in [now[:-2],tomorrow[:-2]]:
                            result_temp["date"]=date
                            if date == now[:-2]:
                                result_temp["hour"]=int(now[-2:])-1
                                result_temp[in_out_en] = math.ceil((abs(model.predict(temp, verbose=0))*temp_max)[0][0])
                                result.loc[(result["hour"] == result_temp["hour"].values[0]) & (result["loc_code"] == result_temp["loc_code"].values[0]) & (result["date"]==date),in_out_en]=result_temp[in_out_en].values[0]
                                temp = np.append(temp[0][1:],result_temp[in_out_en]/temp_max).reshape(1,3,1)
                                for hour in range(int(now[-2:]),24):
                                    result_temp["hour"]=hour
                                    result_temp[in_out_en] = math.ceil((abs(model.predict(temp, verbose=0))*temp_max)[0][0])
                                    result.loc[(result["hour"] == hour) & (result["loc_code"] == result_temp["loc_code"].values[0]) & (result["date"]==date),"out"]=result_temp[in_out_en].values[0]
                                    temp = np.append(temp[0][1:],result_temp[in_out_en]/temp_max).reshape(1,3,1)
                            else:
                                for hour in range(0,24):
                                    result_temp["hour"]=hour
                                    result_temp[in_out_en] = math.ceil((abs(model.predict(temp, verbose=0))*temp_max)[0][0])
                                    result.loc[(result["hour"] == hour) & (result["loc_code"] == result_temp["loc_code"].values[0]) & (result["date"]==date),"out"]=result_temp[in_out_en].values[0]
                                    temp = np.append(temp[0][1:],result_temp[in_out_en]/temp_max).reshape(1,3,1)
        print("결과 정리중")
        
        result.set_index("loc_code",inplace=True)
        pred_table = pd.concat([result,pd.DataFrame(result["in"] - result["out"],columns=["move"])],axis=1)
        pred_table.reset_index(inplace=True)
        pred_table = pred_table[["loc_code","date","hour","in","out","move"]]
        pred_table = pd.merge(pred_table,location[["loc_code","cars_quantity"]], how="inner", on="loc_code")
        pred_table["jam"] = pred_table["move"] / pred_table["cars_quantity"] * 100
        pred_table.drop("cars_quantity",axis=1,inplace=True)
    
        pred_table['jam'] = pred_table.apply(lambda x: self.jamValid(x['jam']),axis=1)
        pred_table.to_sql("predict_data",conn,if_exists="replace")
        self.pred_table = pred_table
        conn.dispose()
        print("실행이 완료되었습니다.")
        
    def run(self):
        self.getHoliday()
        self.getTrafficData()
        self.getLocalData()
        self.predict()

PredictTraffic().run()