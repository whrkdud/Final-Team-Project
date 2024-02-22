import Slider from '@mui/material/Slider';
import '../css/sliderModal.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';

function SliderModal() {
    const [timedata,setTimedata] = useState(0);
    const {setCongestionData, isMobile, sidebarTravelChoice,mobileSidebarButton} = useContext(Context);
    useEffect(()=>{
        gettimedata();
    },[timedata])

    const gettimedata = () => {
        axios.post('http://192.168.0.53:8080/congestionChange',{
            time : timedata
        }).then((res)=>{
            setCongestionData(res.data)
        })
    }

    return(
        <div className='SliderModal'>
            <div className='SliderModalTitle'>
                <p>시간대별 예측 혼잡도 보기</p>
            </div>
            <div className='SliderModalSlider'>
                <Slider 
                    size='small'
                    min={0}
                    max={24}
                    step={1}
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(e) => {return `${e} 시간 후`}}
                    onChange={(e)=>{setTimedata(e.target.value)}}
                    sx={{

                        // valueLabel에 대한 스타일을 여기에 추가
                        '.MuiSlider-valueLabel': {
                        fontSize: '9px', // 예시: 폰트 크기 조절
                        backgroundColor:'gray',
                        width:'50px',
                        height:'18px',
                        borderRadius:'5px'
                        }
                    }}
                />
            </div>
        </div>
    )
}
export default SliderModal