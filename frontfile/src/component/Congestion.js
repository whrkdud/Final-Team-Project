import '../css/congestion.css';
import React, { useState, useEffect } from "react";
import { Map, MapMarker, Polygon } from "react-kakao-maps-sdk";
import locationInfo from '../json/locationInfo.json';
import sig from '../json/sig.json';

function Congestion() {
    const [locationInfoSwitch, setLocationSwitch] = useState([]); // 전국 톨게이트 cctv 마커
    const [sigSwitch, setSigSwitch] = useState([]); // polygon 그리기
    const [fillColor, setFillColor] = useState([]);
    useEffect(() => {
        // // 전국 톨게이트 cctv 마커 찍는 함수
        // const list = locationInfo.list;
        // const paths = list.map(num => (
        //     {
        //         lat : num.yValue,
        //         lng : num.xValue
        //     }
        // ));
        // setLocationSwitch(paths);

        // polygon 그리는 함수
        const features = sig.features;
        const path1 = features.map(feature => (
            feature.geometry.coordinates.map(coords => (
                coords.map(coordinate => ({
                    lat: coordinate[1],
                    lng: coordinate[0]}))
            ))
        ))
        setSigSwitch(path1);
        const colors = features.map(feature => getColor(feature.properties.SIG_CD));
        setFillColor(colors);
    }, []);

    const congestionData = {
        "47230": "1",
        "47250": "2",
        "47210": "3",
        "47190": "4",
        "47170": "5"
    };

    const getColor = (key) => {
        const congestionLevel = congestionData[key];
        
        // 혼잡도에 따라 색상 설정
        if (congestionLevel === "1") {
            return "green";
        } else if (congestionLevel === "2") {
            return "lightgreen";
        } else if (congestionLevel === "3") {
            return "yellow";
        } else if (congestionLevel === "4") {
            return "orange";
        } else if (congestionLevel === "5") {
            return "red";
        } else {
            return "#fff";
        }
    };

    return(
        <Map // 지도를 표시할 Container
        center={{
            // 지도의 중심좌표
            lat: 36.45,
            lng: 127.77,
        }}
        style={{
            // 지도의 크기
            width: "100%",
            height: "90vh",
        }}
        level={12} // 지도의 확대 레벨
        >
            {/* {locationInfoSwitch.map((latlng, index)=>(
                <MapMarker // 마커를 생성합니다
                key={index}
                position={latlng}// 마커가 표시될 위치입니다
                />
            ))} */}

            {/* polygon 그리기 */}
            {sigSwitch.map((coordinates, index) => (
                <Polygon
                    key={index}
                    path={coordinates}
                    strokeWeight={2}
                    strokeColor="#004c80"
                    strokeOpacity={0.8}
                    fillColor={fillColor[index]}
                    fillOpacity={0.7}
                />
            ))} 
        </Map>
    )
}

export default Congestion;