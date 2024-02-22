import '../css/infoSidebar.css';
import { Context } from '../context/Context';
import { useContext, useEffect } from 'react';
import nullImg2 from '../img/nullImgTest2.png';

function InfoSidebar() {
    const {infoSidebarOpenClose,setInfoSidebarOpenClose,lst} = useContext(Context);

    useEffect(()=>{
        infoSidebarOpenButton();
    },[infoSidebarOpenClose])


    const infoSidebarOpenButton = () => {
        const infoSidebar = document.querySelector('.infoSidebar');
        const infoSidebarClose = document.querySelector('.infoSidebarClose');
        if(infoSidebarOpenClose === "1"){
            infoSidebarClose.style.display="flex"
            infoSidebar.style.display = "block"
        }else{
            infoSidebar.style.display = "none"
            infoSidebarClose.style.display="none"
        }
    }
    return(
        <div className='infoSidebar'>
            <div className='infoSidebarCloseWrap'>
                <div className='infoSidebarClose' onClick={()=>{setInfoSidebarOpenClose()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                        <path d="m15.854,8.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm8.146,3.146c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-1,0c0-6.065-4.935-11-11-11S1,5.935,1,12s4.935,11,11,11,11-4.935,11-11Z"/>
                    </svg>
                </div>
            </div>
            <div className='infoSidebarInfo'>
                <img src={lst&&lst.imgurl1?lst.imgurl1:nullImg2}></img>
                <div className='infoSidebarInfoDiv'>
                    <div className='infoSidebarInfoDivWrapWrapWrap'>
                        <div className='infoSidebarInfoDivTitle'>
                            <p dangerouslySetInnerHTML={lst&&{__html:lst.title}}></p>
                        </div>
                        <div className='infoSidebarInfoDivWrap'>
                            <div className='infoSidebarInfoDivWrapWrap'>
                                <div className='infoSidebarInfoDivAddress'>
                                    <div className='infoSidebarInfoDivAddressSvg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                            <path d="M12,24c-1.358,0-2.642-.521-3.611-1.467l-4.152-3.818c-2.092-2.083-3.236-4.834-3.236-7.761s1.145-5.678,3.223-7.747C6.301,1.139,9.062,0,12,0s5.699,1.139,7.777,3.208h0c2.078,2.069,3.223,4.821,3.223,7.747s-1.145,5.678-3.223,7.747l-4.176,3.842c-.96,.936-2.243,1.457-3.602,1.457ZM12,1c-2.671,0-5.183,1.036-7.072,2.917-1.888,1.88-2.928,4.379-2.928,7.038s1.04,5.158,2.928,7.038l4.148,3.814c1.586,1.546,4.271,1.536,5.838,.01l4.172-3.838c1.874-1.866,2.914-4.366,2.914-7.024s-1.04-5.158-2.928-7.038h0c-1.89-1.881-4.401-2.917-7.072-2.917Zm-.441,12.563l6.293-6.207c.196-.194,.198-.51,.005-.707-.196-.197-.512-.199-.708-.005l-6.295,6.209c-.193,.195-.513,.195-.712-.005l-3.293-3.207c-.195-.191-.513-.188-.707,.01-.192,.198-.188,.514,.01,.707l3.288,3.202c.293,.293,.677,.439,1.062,.439,.383,0,.767-.146,1.058-.437Z"/>
                                        </svg>
                                    </div>
                                    <p dangerouslySetInnerHTML={lst&&{__html:lst.address}}></p>
                                </div>
                                <div className='infoSidebarInfoDivTel'>
                                    <div className='infoSidebarInfoDivTelSvg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                            <path d="m23.5,11c-.276,0-.5-.224-.5-.5,0-5.238-4.262-9.5-9.5-9.5-.276,0-.5-.224-.5-.5s.224-.5.5-.5c5.79,0,10.5,4.71,10.5,10.5,0,.276-.224.5-.5.5Zm-3.5-.5c0-3.584-2.916-6.5-6.5-6.5-.276,0-.5.224-.5.5s.224.5.5.5c3.033,0,5.5,2.467,5.5,5.5,0,.276.224.5.5.5s.5-.224.5-.5Zm2.234,11.771l.978-1.125c.508-.508.788-1.184.788-1.902s-.28-1.395-.837-1.945l-2.446-1.873c-1.048-1.048-2.753-1.049-3.803-.003l-1.532,1.494c-3.68-1.499-6.678-4.5-8.294-8.303l1.488-1.525c1.049-1.049,1.049-2.756.043-3.756l-1.959-2.543c-1.017-1.017-2.813-.993-3.78-.023l-1.174,1.024C.605,2.886,0,4.373,0,5.976c0,7.749,10.275,18.024,18.024,18.024,1.603,0,3.089-.605,4.21-1.729ZM5.909,1.446l1.959,2.543c.659.659.659,1.732-.004,2.396l-1.722,1.766c-.138.142-.18.352-.106.536,1.729,4.305,5.113,7.688,9.286,9.28.182.07.388.027.527-.108l1.766-1.722s.003-.003.004-.005c.639-.64,1.704-.681,2.44.043l2.446,1.873c.659.659.659,1.731-.023,2.416l-.979,1.125c-.908.91-2.144,1.411-3.479,1.411C10.864,23,1,13.136,1,5.976c0-1.335.501-2.571,1.387-3.456l1.175-1.025c.336-.336.779-.5,1.215-.5.419,0,.831.152,1.133.452Z"/>
                                        </svg>
                                    </div>
                                    <p dangerouslySetInnerHTML={lst&&lst.tel!==null?{__html:lst.tel}:{__html:'정보없음'}}></p>
                                </div>
                                {lst&&lst.dayoff?<div className='infoSidebarInfoDivDayoff'>
                                    <div className='infoSidebarInfoDivDayoffSvg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                            <path d="m15.854,12.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm8.146-6.354v13c0,2.481-2.019,4.5-4.5,4.5H4.5c-2.481,0-4.5-2.019-4.5-4.5V6.5C0,4.019,2.019,2,4.5,2h1.5V.5c0-.276.224-.5.5-.5s.5.224.5.5v1.5h10V.5c0-.276.224-.5.5-.5s.5.224.5.5v1.5h1.5c2.481,0,4.5,2.019,4.5,4.5ZM1,6.5v1.5h22v-1.5c0-1.93-1.57-3.5-3.5-3.5H4.5c-1.93,0-3.5,1.57-3.5,3.5Zm22,13v-10.5H1v10.5c0,1.93,1.57,3.5,3.5,3.5h15c1.93,0,3.5-1.57,3.5-3.5Z"/>
                                        </svg>
                                    </div>
                                    <p dangerouslySetInnerHTML={lst&&lst.dayoff!==null?{__html:lst.dayoff}:{__html:'정보없음'}}></p>
                                </div>:null}
                                {lst&&lst.parking?<div className='infoSidebarInfoDivParking'>
                                    <div className='infoSidebarInfoDivParkingSvg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                            <path d="M13.5,5h-3c-1.93,0-3.5,1.57-3.5,3.5v10c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-4.5h5.5c2.481,0,4.5-2.019,4.5-4.5s-2.019-4.5-4.5-4.5Zm0,8h-5.5v-4.5c0-1.378,1.121-2.5,2.5-2.5h3c1.93,0,3.5,1.57,3.5,3.5s-1.57,3.5-3.5,3.5ZM12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Z"/>
                                        </svg>
                                    </div>
                                    <p dangerouslySetInnerHTML={lst&&lst.parking!==null?{__html:lst.parking}:{__html:'정보없음'}}></p>
                                </div>:null}
                                {lst&&lst.startdate?<div className='infoSidebarInfoDivStartEnd'>
                                    <div className='infoSidebarInfoDivStartEndSvg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                            <path d="M19.5,2h-1.5V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5H7V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5h-1.5C2.019,2,0,4.019,0,6.5v13c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V6.5c0-2.481-2.019-4.5-4.5-4.5ZM4.5,3h15c1.93,0,3.5,1.57,3.5,3.5v1.5H1v-1.5c0-1.93,1.57-3.5,3.5-3.5Zm15,20H4.5c-1.93,0-3.5-1.57-3.5-3.5V9H23v10.5c0,1.93-1.57,3.5-3.5,3.5Zm-.652-10.859c.192,.198,.188,.514-.01,.707l-6.596,6.424c-.484,.484-1.122,.727-1.762,.727s-1.281-.244-1.77-.732l-3.562-3.401c-.199-.19-.207-.507-.016-.707,.189-.2,.506-.208,.707-.016l3.569,3.409c.581,.582,1.562,.575,2.13,.008l6.601-6.429c.196-.191,.514-.189,.707,.01Z"/>
                                        </svg>
                                    </div>
                                    <p dangerouslySetInnerHTML={lst&&lst.startdate!==null?{__html:lst.startdate+' ~ '+lst.enddate}:{__html:'정보없음'}}></p>
                                </div>:null}
                                {lst&&lst.rooms?<div className='infoSidebarInfoDivRooms'>
                                    <div className='infoSidebarInfoDivRoomsSvg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                            <path d="M19.5,2H4.5C2.019,2,0,4.019,0,6.5v15c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-2.5H23v2.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5V6.5c0-2.481-2.019-4.5-4.5-4.5ZM4.5,3h15c1.93,0,3.5,1.57,3.5,3.5v7.5h-2v-1.5c0-1.93-1.57-3.5-3.5-3.5h-2.5c-1.272,0-2.387,.682-3,1.699-.613-1.017-1.728-1.699-3-1.699h-2.5c-1.93,0-3.5,1.57-3.5,3.5v1.5H1V6.5c0-1.93,1.57-3.5,3.5-3.5ZM12.5,14v-1.5c0-1.378,1.121-2.5,2.5-2.5h2.5c1.379,0,2.5,1.122,2.5,2.5v1.5h-7.5Zm-8.5,0v-1.5c0-1.378,1.122-2.5,2.5-2.5h2.5c1.378,0,2.5,1.122,2.5,2.5v1.5H4Zm-3,4v-3H23v3H1Z"/>
                                        </svg>
                                    </div>
                                    <p dangerouslySetInnerHTML={lst&&lst.rooms!==null?{__html:lst.rooms}:{__html:'정보없음'}}></p>
                                </div>:null}
                            </div>
                        </div>
                    </div>
                    <div className='infoSidebarInfoDivStory'>
                        <p dangerouslySetInnerHTML={lst&&{__html:lst.story}}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSidebar;