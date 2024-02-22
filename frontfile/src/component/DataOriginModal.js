import '../css/dataOriginModal.css';
import { Context } from '../context/Context';
import { useContext, useEffect } from 'react';

function DataOriginModal() {
    const { context } = useContext(Context);

    const modal = ()=>{
        if(context==='1') {
            const dataOriginModal = document.querySelector('.dataOriginModal');
            dataOriginModal.style.display = 'flex';
            
        } else {
            const dataOriginModal = document.querySelector('.dataOriginModal');
            dataOriginModal.style.display = 'none';
        }
    }

    useEffect(()=>{
        modal();
    },[context])
    

    return(
        <div className='dataOriginModal'>
            <p>'혼잡도 지도'와 '여행지 지도'는</p>
            <p><strong>공공데이터포털&#40;도로교통공단 API&#41;</strong>,</p>
            <p><strong>TourAPI4.0</strong>에서 제공하는</p>
            <p>데이터를 기반으로 제작되었습니다.</p>
        </div>
    )
}

export default DataOriginModal;