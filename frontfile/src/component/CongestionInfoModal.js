import '../css/congestionInfoModal.css';

function CongestionInfoModal() {
    return(
        <div className='congestionInfoModal'>
            <div className='congestionInfoModalColorInfo'>
                <div className='congestionInfoModalColorInfoRed'>
                    <div className='congestionInfoModalColorInfoRedColor'>
                        <div></div>
                    </div>
                    <div className='congestionInfoModalColorInfoP'>
                        <p>:</p>
                    </div>
                    <div className='congestionInfoModalColorInfoRedCongestion'>
                        <p>혼잡</p>
                    </div>
                    <div className='congestionInfoModalColorInfoRedPercent'>
                        <p>(+10%~)</p>
                    </div>                 
                </div>
                <div className='congestionInfoModalColorInfoOrange'>
                    <div className='congestionInfoModalColorInfoOrangeColor'>
                        <div></div>
                    </div>
                    <div className='congestionInfoModalColorInfoP'>
                        <p>:</p>
                    </div>
                    <div className='congestionInfoModalColorInfoOrangeCongestion'>
                        <p>조금혼잡</p>
                    </div>
                    <div className='congestionInfoModalColorInfoOrangePercent'>
                        <p>(+10%)</p>
                    </div>
                </div>
                <div className='congestionInfoModalColorInfoYellow'>
                    <div className='congestionInfoModalColorInfoYellowColor'>
                        <div></div>
                    </div>
                    <div className='congestionInfoModalColorInfoP'>
                        <p>:</p>
                    </div>
                    <div className='congestionInfoModalColorInfoYellowCongestion'>
                        <p>보통</p>
                    </div>
                    <div className='congestionInfoModalColorInfoYellowPercent'>
                        <p>(+5%)</p>
                    </div> 
                </div>
                <div className='congestionInfoModalColorInfoGreen'>
                    <div className='congestionInfoModalColorInfoGreenColor'>
                        <div></div>
                    </div>
                    <div className='congestionInfoModalColorInfoP'>
                        <p>:</p>
                    </div>
                    <div className='congestionInfoModalColorInfoGreenCongestion'>
                        <p>조금원활</p>
                    </div>
                    <div className='congestionInfoModalColorInfoGreenPercent'>
                        <p>(0%)</p>
                    </div>
                </div>
                <div className='congestionInfoModalColorInfoBlue'>
                    <div className='congestionInfoModalColorInfoBlueColor'>
                        <div></div>
                    </div>
                    <div className='congestionInfoModalColorInfoP'>
                        <p>:</p>
                    </div>
                    <div className='congestionInfoModalColorInfoBlueCongestion'>
                        <p>원활</p>
                    </div>
                    <div className='congestionInfoModalColorInfoBluePercent'>
                        <p>(-5%)</p>
                    </div>
                </div>
            </div>
            <div className='congestionInfoModalMathInfo'>
                <div className='congestionInfoModalMathInfoIcon'>
                    <p>※</p>
                </div>
                <div className='congestionInfoModalMathInfoText'>
                    <div className='congestionInfoModalMathInfoText1'>
                        <p>혼잡도 분류 기준 : </p>
                    </div>
                    <div className='congestionInfoModalMathInfoText2'>
                        <p>(지역으로 들어가는 차량 수 - 지역에서 나오는 차량 수) ÷ (해당 지역의 차량 등록 수) × 100</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CongestionInfoModal;