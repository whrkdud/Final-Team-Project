import '../css/sidebarTravel.css';
import { Context } from '../context/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import nullImg1 from '../img/nullImgTest1.png';

function SidebarTravel() {
    const {sigid,setTourPlace,setFestival,setAccommodation,setSidebarClick,sidebarclick,tourplace,festival,accommodation,setLst,sidebarTravelChoice,setSidebarTravelChoice,setInfoSidebarOpenClose,locationName,locationCongest,isMobile,setMobileSidebarButton} = useContext(Context)
    const [catNull, setCatNull] = useState([]);
    const [congest,setCongest] = useState();

    useEffect(()=>{
        locationCongestResult();
    },[locationCongest])

    const tourdata = () => {
        axios.post('http://192.168.0.53:8080/travelData', {
            sigid : sigid
        }).then((res)=>{
            setTourPlace(res.data)
            setSidebarClick("1")
        })
    }
    const festivaldata = () => {
        axios.post('http://192.168.0.53:8080/festivalData', {
            sigid : sigid
        }).then((res)=>{
            setFestival(res.data)
            setSidebarClick("2")
        })
    }

    const accommodationdata = () => {
        axios.post('http://192.168.0.53:8080/accommodationData', {
            sigid : sigid
        }).then((res)=>{
            setAccommodation(res.data)
            setSidebarClick("3")
        })
    }

    const tourcategory = (cat) => {
        setInfoSidebarOpenClose();
        axios.post('http://192.168.0.53:8080/tourCategory', {
            sigid : sigid,
            category : cat
        }).then((res) => {
            setTourPlace(res.data)
            if(res.data.length===0){
                setCatNull(<div className='catNull'><p>정보가 없습니다.</p></div>);
            }else{
                setCatNull();
            }
            setLst();
        })
    }

    const locationCongestResult = () => {
        const sidebarTravelChoiceOPlaceCongestion = document.querySelector('.sidebarTravelChoiceOPlaceCongestion')
        if (locationCongest === "rgb(140, 192, 222)") {
            setCongest("원활");
            sidebarTravelChoiceOPlaceCongestion.style.backgroundColor = locationCongest;
        } else if (locationCongest === "rgb(153, 188, 133)") {
            setCongest("조금원활")
            sidebarTravelChoiceOPlaceCongestion.style.backgroundColor = locationCongest;
        } else if (locationCongest === "rgb(243, 209, 121)") {
            setCongest("보통")
            sidebarTravelChoiceOPlaceCongestion.style.backgroundColor = locationCongest;
        } else if (locationCongest === "rgb(240, 152, 114)") {
            setCongest("조금혼잡")
            sidebarTravelChoiceOPlaceCongestion.style.backgroundColor = locationCongest;
        } else if (locationCongest === "rgb(244, 96, 96)") {
            setCongest("혼잡")
            sidebarTravelChoiceOPlaceCongestion.style.backgroundColor = locationCongest;
        } else {
            setCongest("정보없음")
            sidebarTravelChoiceOPlaceCongestion.style.backgroundColor = "gray";
        }
    }

    const sidebarTravelChoice1WrapSvgColor = ()=>{
        const sidebarTravelChoice1WrapSvg = document.querySelector('.sidebarTravelChoice1Wrap svg');
        const sidebarTravelChoice2WrapSvg = document.querySelector('.sidebarTravelChoice2Wrap svg');
        const sidebarTravelChoice3WrapSvg = document.querySelector('.sidebarTravelChoice3Wrap svg');

        sidebarTravelChoice1WrapSvg.style.fill = 'rgb(199, 220, 167)';
        sidebarTravelChoice2WrapSvg.style.fill = 'black';
        sidebarTravelChoice3WrapSvg.style.fill = 'black';
    }
    const sidebarTravelChoice2WrapSvgColor = ()=>{
        const sidebarTravelChoice1WrapSvg = document.querySelector('.sidebarTravelChoice1Wrap svg');
        const sidebarTravelChoice2WrapSvg = document.querySelector('.sidebarTravelChoice2Wrap svg');
        const sidebarTravelChoice3WrapSvg = document.querySelector('.sidebarTravelChoice3Wrap svg');

        sidebarTravelChoice1WrapSvg.style.fill = 'black';
        sidebarTravelChoice2WrapSvg.style.fill = 'rgb(255, 197, 197)';
        sidebarTravelChoice3WrapSvg.style.fill = 'black';
    }
    const sidebarTravelChoice3WrapSvgColor = ()=>{
        const sidebarTravelChoice1WrapSvg = document.querySelector('.sidebarTravelChoice1Wrap svg');
        const sidebarTravelChoice2WrapSvg = document.querySelector('.sidebarTravelChoice2Wrap svg');
        const sidebarTravelChoice3WrapSvg = document.querySelector('.sidebarTravelChoice3Wrap svg');

        sidebarTravelChoice1WrapSvg.style.fill = 'black';
        sidebarTravelChoice2WrapSvg.style.fill = 'black';
        sidebarTravelChoice3WrapSvg.style.fill = 'rgb(227, 209, 182)';
    }

    useEffect(()=>{
        test();
    }, [sidebarTravelChoice,sidebarclick])

    const test = ()=>{
        if(sidebarTravelChoice==='o') {
            const sidebarTravelChoiceX = document.querySelector('.sidebarTravelChoiceX');
            const sidebarTravelChoiceOWrapWrap = document.querySelector('.sidebarTravelChoiceOWrapWrap');
            const sidebarTravelListX = document.querySelector('.sidebarTravelListX');
            const sidebarTravelListO = document.querySelector('.sidebarTravelListO');
            if(sidebarclick === '1'||sidebarclick === '2'||sidebarclick === '3') {
                sidebarTravelListX.style.display = 'none';
                sidebarTravelListO.style.display = 'block';
            }else{
                sidebarTravelListX.style.display = 'flex';
                sidebarTravelListO.style.display = 'none';
                const sidebarTravelChoiceOSvg = document.querySelectorAll('.sidebarTravelChoiceO svg');
                for(let i = 0; i<sidebarTravelChoiceOSvg.length; i++){
                    sidebarTravelChoiceOSvg[i].style.fill = 'black';
                }
            }
            sidebarTravelChoiceX.style.display = 'none';
            sidebarTravelChoiceOWrapWrap.style.display = 'block';
            
        } else if(sidebarTravelChoice==='x') {
            const sidebarTravelChoiceX = document.querySelector('.sidebarTravelChoiceX');
            const sidebarTravelChoiceOWrapWrap = document.querySelector('.sidebarTravelChoiceOWrapWrap');
            const sidebarTravelChoiceOSvg = document.querySelectorAll('.sidebarTravelChoiceO svg');
            for(let i = 0; i<sidebarTravelChoiceOSvg.length; i++){
                sidebarTravelChoiceOSvg[i].style.fill = 'black';
            }
            sidebarTravelChoiceX.style.display = 'flex';
            sidebarTravelChoiceOWrapWrap.style.display = 'none';
        }
    }

    const sidebarTravelChoice1CategoryShow = ()=>{
        const sidebarTravelChoice1Category= document.querySelector('.sidebarTravelChoice1Category');
        sidebarTravelChoice1Category.style.display = 'flex';
    }
    const sidebarTravelChoice1CategoryShowX = ()=>{
        const sidebarTravelChoice1Category= document.querySelector('.sidebarTravelChoice1Category');
        sidebarTravelChoice1Category.style.display = 'none';
    }

    const sidebarTravelListO1Click = ()=>{
        const sidebarTravelListO1 = document.querySelector('.sidebarTravelListO1');
        const sidebarTravelListO2 = document.querySelector('.sidebarTravelListO2');
        const sidebarTravelListO3 = document.querySelector('.sidebarTravelListO3');
        sidebarTravelListO1.style.display = 'block';
        sidebarTravelListO2.style.display = 'none';
        sidebarTravelListO3.style.display = 'none';
    }

    const sidebarTravelListO2Click = ()=>{
        const sidebarTravelListO1 = document.querySelector('.sidebarTravelListO1');
        const sidebarTravelListO2 = document.querySelector('.sidebarTravelListO2');
        const sidebarTravelListO3 = document.querySelector('.sidebarTravelListO3');
        sidebarTravelListO1.style.display = 'none';
        sidebarTravelListO2.style.display = 'block';
        sidebarTravelListO3.style.display = 'none';
    }

    const sidebarTravelListO3Click = ()=>{
        const sidebarTravelListO1 = document.querySelector('.sidebarTravelListO1');
        const sidebarTravelListO2 = document.querySelector('.sidebarTravelListO2');
        const sidebarTravelListO3 = document.querySelector('.sidebarTravelListO3');
        sidebarTravelListO1.style.display = 'none';
        sidebarTravelListO2.style.display = 'none';
        sidebarTravelListO3.style.display = 'block';
    }

    const sidebarTravelChoice1Category1_1Color = ()=>{
        const sidebarTravelChoice1Category1_1 = document.querySelector('.sidebarTravelChoice1Category1-1');
        const sidebarTravelChoice1Category1_2 = document.querySelector('.sidebarTravelChoice1Category1-2');
        const sidebarTravelChoice1Category1_3= document.querySelector('.sidebarTravelChoice1Category1-3');
        const sidebarTravelChoice1Category1_4 = document.querySelector('.sidebarTravelChoice1Category1-4');
        const sidebarTravelChoice1Category2_1 = document.querySelector('.sidebarTravelChoice1Category2-1');
        const sidebarTravelChoice1Category2_2 = document.querySelector('.sidebarTravelChoice1Category2-2');
        const sidebarTravelChoice1Category2_3 = document.querySelector('.sidebarTravelChoice1Category2-3');
        
        sidebarTravelChoice1Category1_1.style.color = 'white';
        sidebarTravelChoice1Category1_1.style.backgroundColor = 'rgb(244, 96, 96)';
        sidebarTravelChoice1Category1_1.style.borderRadius = '5px';

        sidebarTravelChoice1Category1_2.style.color = 'black';
        sidebarTravelChoice1Category1_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_3.style.color = 'black';
        sidebarTravelChoice1Category1_3.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_4.style.color = 'black';
        sidebarTravelChoice1Category1_4.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_1.style.color = 'black';
        sidebarTravelChoice1Category2_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_2.style.color = 'black';
        sidebarTravelChoice1Category2_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_3.style.color = 'black';
        sidebarTravelChoice1Category2_3.style.backgroundColor = 'white';
    }

    const sidebarTravelChoice1Category1_2Color = ()=>{
        const sidebarTravelChoice1Category1_1 = document.querySelector('.sidebarTravelChoice1Category1-1');
        const sidebarTravelChoice1Category1_2 = document.querySelector('.sidebarTravelChoice1Category1-2');
        const sidebarTravelChoice1Category1_3= document.querySelector('.sidebarTravelChoice1Category1-3');
        const sidebarTravelChoice1Category1_4 = document.querySelector('.sidebarTravelChoice1Category1-4');
        const sidebarTravelChoice1Category2_1 = document.querySelector('.sidebarTravelChoice1Category2-1');
        const sidebarTravelChoice1Category2_2 = document.querySelector('.sidebarTravelChoice1Category2-2');
        const sidebarTravelChoice1Category2_3 = document.querySelector('.sidebarTravelChoice1Category2-3');
        
        sidebarTravelChoice1Category1_2.style.color = 'white';
        sidebarTravelChoice1Category1_2.style.backgroundColor = 'rgb(240, 152, 114)';
        sidebarTravelChoice1Category1_2.style.borderRadius = '5px';

        sidebarTravelChoice1Category1_1.style.color = 'black';
        sidebarTravelChoice1Category1_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_3.style.color = 'black';
        sidebarTravelChoice1Category1_3.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_4.style.color = 'black';
        sidebarTravelChoice1Category1_4.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_1.style.color = 'black';
        sidebarTravelChoice1Category2_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_2.style.color = 'black';
        sidebarTravelChoice1Category2_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_3.style.color = 'black';
        sidebarTravelChoice1Category2_3.style.backgroundColor = 'white';
    }

    const sidebarTravelChoice1Category1_3Color = ()=>{
        const sidebarTravelChoice1Category1_1 = document.querySelector('.sidebarTravelChoice1Category1-1');
        const sidebarTravelChoice1Category1_2 = document.querySelector('.sidebarTravelChoice1Category1-2');
        const sidebarTravelChoice1Category1_3= document.querySelector('.sidebarTravelChoice1Category1-3');
        const sidebarTravelChoice1Category1_4 = document.querySelector('.sidebarTravelChoice1Category1-4');
        const sidebarTravelChoice1Category2_1 = document.querySelector('.sidebarTravelChoice1Category2-1');
        const sidebarTravelChoice1Category2_2 = document.querySelector('.sidebarTravelChoice1Category2-2');
        const sidebarTravelChoice1Category2_3 = document.querySelector('.sidebarTravelChoice1Category2-3');
        
        sidebarTravelChoice1Category1_3.style.color = 'white';
        sidebarTravelChoice1Category1_3.style.backgroundColor = 'rgb(243, 209, 121)';
        sidebarTravelChoice1Category1_3.style.borderRadius = '5px';

        sidebarTravelChoice1Category1_2.style.color = 'black';
        sidebarTravelChoice1Category1_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_1.style.color = 'black';
        sidebarTravelChoice1Category1_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_4.style.color = 'black';
        sidebarTravelChoice1Category1_4.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_1.style.color = 'black';
        sidebarTravelChoice1Category2_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_2.style.color = 'black';
        sidebarTravelChoice1Category2_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_3.style.color = 'black';
        sidebarTravelChoice1Category2_3.style.backgroundColor = 'white';
    }

    const sidebarTravelChoice1Category1_4Color = ()=>{
        const sidebarTravelChoice1Category1_1 = document.querySelector('.sidebarTravelChoice1Category1-1');
        const sidebarTravelChoice1Category1_2 = document.querySelector('.sidebarTravelChoice1Category1-2');
        const sidebarTravelChoice1Category1_3= document.querySelector('.sidebarTravelChoice1Category1-3');
        const sidebarTravelChoice1Category1_4 = document.querySelector('.sidebarTravelChoice1Category1-4');
        const sidebarTravelChoice1Category2_1 = document.querySelector('.sidebarTravelChoice1Category2-1');
        const sidebarTravelChoice1Category2_2 = document.querySelector('.sidebarTravelChoice1Category2-2');
        const sidebarTravelChoice1Category2_3 = document.querySelector('.sidebarTravelChoice1Category2-3');
        
        sidebarTravelChoice1Category1_4.style.color = 'white';
        sidebarTravelChoice1Category1_4.style.backgroundColor = 'rgb(153, 188, 133)';
        sidebarTravelChoice1Category1_4.style.borderRadius = '5px';

        sidebarTravelChoice1Category1_2.style.color = 'black';
        sidebarTravelChoice1Category1_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_3.style.color = 'black';
        sidebarTravelChoice1Category1_3.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_1.style.color = 'black';
        sidebarTravelChoice1Category1_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_1.style.color = 'black';
        sidebarTravelChoice1Category2_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_2.style.color = 'black';
        sidebarTravelChoice1Category2_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_3.style.color = 'black';
        sidebarTravelChoice1Category2_3.style.backgroundColor = 'white';
    }

    const sidebarTravelChoice1Category2_1Color = ()=>{
        const sidebarTravelChoice1Category1_1 = document.querySelector('.sidebarTravelChoice1Category1-1');
        const sidebarTravelChoice1Category1_2 = document.querySelector('.sidebarTravelChoice1Category1-2');
        const sidebarTravelChoice1Category1_3= document.querySelector('.sidebarTravelChoice1Category1-3');
        const sidebarTravelChoice1Category1_4 = document.querySelector('.sidebarTravelChoice1Category1-4');
        const sidebarTravelChoice1Category2_1 = document.querySelector('.sidebarTravelChoice1Category2-1');
        const sidebarTravelChoice1Category2_2 = document.querySelector('.sidebarTravelChoice1Category2-2');
        const sidebarTravelChoice1Category2_3 = document.querySelector('.sidebarTravelChoice1Category2-3');
        
        sidebarTravelChoice1Category2_1.style.color = 'white';
        sidebarTravelChoice1Category2_1.style.backgroundColor = 'rgb(140, 192, 222)';
        sidebarTravelChoice1Category2_1.style.borderRadius = '5px';

        sidebarTravelChoice1Category1_2.style.color = 'black';
        sidebarTravelChoice1Category1_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_3.style.color = 'black';
        sidebarTravelChoice1Category1_3.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_4.style.color = 'black';
        sidebarTravelChoice1Category1_4.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_1.style.color = 'black';
        sidebarTravelChoice1Category1_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_2.style.color = 'black';
        sidebarTravelChoice1Category2_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_3.style.color = 'black';
        sidebarTravelChoice1Category2_3.style.backgroundColor = 'white';
    }

    const sidebarTravelChoice1Category2_2Color = ()=>{
        const sidebarTravelChoice1Category1_1 = document.querySelector('.sidebarTravelChoice1Category1-1');
        const sidebarTravelChoice1Category1_2 = document.querySelector('.sidebarTravelChoice1Category1-2');
        const sidebarTravelChoice1Category1_3= document.querySelector('.sidebarTravelChoice1Category1-3');
        const sidebarTravelChoice1Category1_4 = document.querySelector('.sidebarTravelChoice1Category1-4');
        const sidebarTravelChoice1Category2_1 = document.querySelector('.sidebarTravelChoice1Category2-1');
        const sidebarTravelChoice1Category2_2 = document.querySelector('.sidebarTravelChoice1Category2-2');
        const sidebarTravelChoice1Category2_3 = document.querySelector('.sidebarTravelChoice1Category2-3');
        
        sidebarTravelChoice1Category2_2.style.color = 'white';
        sidebarTravelChoice1Category2_2.style.backgroundColor = 'rgb(83, 113, 136)';
        sidebarTravelChoice1Category2_2.style.borderRadius = '5px';

        sidebarTravelChoice1Category1_2.style.color = 'black';
        sidebarTravelChoice1Category1_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_3.style.color = 'black';
        sidebarTravelChoice1Category1_3.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_4.style.color = 'black';
        sidebarTravelChoice1Category1_4.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_1.style.color = 'black';
        sidebarTravelChoice1Category2_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_1.style.color = 'black';
        sidebarTravelChoice1Category1_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_3.style.color = 'black';
        sidebarTravelChoice1Category2_3.style.backgroundColor = 'white';
    }

    const sidebarTravelChoice1Category2_3Color = ()=>{
        const sidebarTravelChoice1Category1_1 = document.querySelector('.sidebarTravelChoice1Category1-1');
        const sidebarTravelChoice1Category1_2 = document.querySelector('.sidebarTravelChoice1Category1-2');
        const sidebarTravelChoice1Category1_3= document.querySelector('.sidebarTravelChoice1Category1-3');
        const sidebarTravelChoice1Category1_4 = document.querySelector('.sidebarTravelChoice1Category1-4');
        const sidebarTravelChoice1Category2_1 = document.querySelector('.sidebarTravelChoice1Category2-1');
        const sidebarTravelChoice1Category2_2 = document.querySelector('.sidebarTravelChoice1Category2-2');
        const sidebarTravelChoice1Category2_3 = document.querySelector('.sidebarTravelChoice1Category2-3');
        
        sidebarTravelChoice1Category2_3.style.color = 'white';
        sidebarTravelChoice1Category2_3.style.backgroundColor = 'rgb(186, 144, 198)';
        sidebarTravelChoice1Category2_3.style.borderRadius = '5px';

        sidebarTravelChoice1Category1_2.style.color = 'black';
        sidebarTravelChoice1Category1_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_3.style.color = 'black';
        sidebarTravelChoice1Category1_3.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_4.style.color = 'black';
        sidebarTravelChoice1Category1_4.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_1.style.color = 'black';
        sidebarTravelChoice1Category2_1.style.backgroundColor = 'white';

        sidebarTravelChoice1Category2_2.style.color = 'black';
        sidebarTravelChoice1Category2_2.style.backgroundColor = 'white';

        sidebarTravelChoice1Category1_1.style.color = 'black';
        sidebarTravelChoice1Category1_1.style.backgroundColor = 'white';
    }

    return(
        <div className='sidebarTravel'>
            <div className='sidebarTravelChoiceX'> 
                {isMobile ?
                    <div className='mobileSidebarTravelChoiceXWrap'>
                        <div className='mobileSidebarTravelChoiceX'  onClick={()=>{setMobileSidebarButton(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                                <path d="m15.854,8.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm8.146,3.146c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-1,0c0-6.065-4.935-11-11-11S1,5.935,1,12s4.935,11,11,11,11-4.935,11-11Z"/>
                            </svg>
                        </div>
                    </div>
                    : ''
                }
                {isMobile?
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width='50' height='50'>
                        <path d="m17.814,5.392c-.098.101-.228.151-.357.151-.126,0-.252-.047-.35-.142l-4.043-3.948c-.165-.167-.358-.288-.564-.362v22.409c0,.276-.224.5-.5.5s-.5-.224-.5-.5V1.083c-.205.071-.398.187-.563.35l-4.091,3.928c-.199.19-.517.187-.707-.015-.191-.199-.186-.516.014-.707L10.239.716c.473-.466,1.123-.716,1.761-.716.624.016,1.297.265,1.77.744l4.037,3.941c.197.193.201.51.008.707Z"/>
                    </svg>: 
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width='50' height='50'>
                        <path d="m23.263,10.237c.467.461.731,1.098.737,1.763-.002.658-.258,1.296-.721,1.766l-3.918,4.081c-.098.102-.229.153-.361.153-.125,0-.25-.046-.346-.14-.199-.19-.206-.508-.015-.707l3.923-4.086c.163-.165.283-.358.355-.567H.5c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h22.411c-.075-.208-.196-.398-.358-.558l-3.955-4.05c-.193-.197-.189-.514.009-.707.198-.192.514-.189.707.009l3.948,4.043Zm.737,1.763s0-.006,0,0h0Z"/>
                    </svg>}
                <p>지도에서 지역을 선택해주세요.</p>
            </div>
            <div className='sidebarTravelChoiceOWrapWrap'>
                <div className='sidebarTravelChoiceOWrap'>
                    {isMobile?
                        <div className='mobileSidebarTravelChoiceOPlace'>
                            <div className='sidebarTravelChoiceOPlace'>
                                <p>{locationName}</p>
                                <div className='sidebarTravelChoiceOPlaceCongestion'>
                                    <p>{congest}</p>
                                </div>
                            </div>
                            <div className='mobileSidebarClose' onClick={()=>{setMobileSidebarButton(false)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                                    <path d="m15.854,8.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm8.146,3.146c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-1,0c0-6.065-4.935-11-11-11S1,5.935,1,12s4.935,11,11,11,11-4.935,11-11Z"/>
                                </svg>
                            </div>
                        </div> : 
                        <div className='sidebarTravelChoiceOPlace'>
                            <p>{locationName}</p>
                            <div className='sidebarTravelChoiceOPlaceCongestion'>
                                <p>{congest}</p>
                            </div>
                        </div>
                    }
                    <div className='sidebarTravelChoiceO'>
                        <div className='sidebarTravelChoice1'>
                            <div className='sidebarTravelChoice1Wrap' onClick={()=>{sidebarTravelChoice1WrapSvgColor();tourdata();setLst();setInfoSidebarOpenClose();sidebarTravelChoice1CategoryShow();sidebarTravelListO1Click();setMobileSidebarButton(false);setTimeout(()=>{setMobileSidebarButton(true)},800)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width='20' height='20'>
                                    <path d="m20,8c2.206,0,4-1.794,4-4s-1.794-4-4-4-4,1.794-4,4,1.794,4,4,4Zm0-7c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm-.839,10.87c-.433-.812-1.241-1.297-2.161-1.297s-1.729.485-2.161,1.297l-4.548,8.528c-.408.766-.387,1.667.061,2.411.446.745,1.231,1.19,2.101,1.19h9.096c.869,0,1.654-.445,2.101-1.19.447-.744.469-1.646.061-2.411l-4.548-8.528Zm3.63,10.426c-.265.44-.729.704-1.243.704h-9.096c-.515,0-.979-.264-1.243-.704s-.277-.974-.035-1.427l4.548-8.528c.256-.48.733-.768,1.278-.768s1.022.287,1.278.768l4.548,8.528c.242.453.229.986-.035,1.427ZM9.976,6c-.534,0-1.002.281-1.253.752L1.17,20.912c-.237.444-.224.968.035,1.399.259.431.714.688,1.217.688h5.078c.276,0,.5.224.5.5s-.224.5-.5.5H2.422c-.857,0-1.633-.438-2.074-1.174s-.464-1.627-.061-2.385L7.84,6.281c.428-.802,1.227-1.281,2.136-1.281s1.707.479,2.135,1.281l1.591,2.983c.13.244.037.547-.206.677-.244.128-.547.038-.677-.206l-1.591-2.983c-.251-.471-.719-.752-1.252-.752Z"/>
                                </svg>
                                <p><nobr>관광지</nobr></p>
                            </div>
                        </div>
                        <div className='sidebarTravelChoice2'>
                            <div className='sidebarTravelChoice2Wrap' onClick={()=>{sidebarTravelChoice2WrapSvgColor();festivaldata();setLst();setInfoSidebarOpenClose();sidebarTravelChoice1CategoryShowX();sidebarTravelListO2Click();setMobileSidebarButton(false);setTimeout(()=>{setMobileSidebarButton(true)},800)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width='20' height='20'>
                                    <path d="m19.076,11.234c.46-.734.924-1.864.924-2.734,0-.276.224-.5.5-.5s.5.224.5.5c0,1.142-.58,2.473-1.076,3.266-.095.151-.258.234-.424.234-.091,0-.183-.024-.266-.076-.233-.146-.305-.455-.158-.689Zm-9.576-3.234c-.276,0-.5.224-.5.5,0,.87-.464,2-.924,2.734-.146.234-.075.543.158.689.083.052.175.076.266.076.166,0,.329-.083.424-.234.496-.793,1.076-2.124,1.076-3.266,0-.276-.224-.5-.5-.5Zm12.5,14c0,1.294-1.225,1.921-1.276,1.947-.072.036-.148.053-.224.053-.183,0-.359-.101-.447-.276-.123-.247-.023-.547.224-.671.005-.002.724-.382.724-1.053,0-.746-.646-1.16-1.712-1.752-.908-.505-1.938-1.078-2.217-2.158-.164-.636-.044-1.358.367-2.194-2.009-.515-3.65-2.887-4.436-5.597-1.003,3.524-3.413,6.695-6.243,6.702-.402.584-.742,1.195-.759,1.378,0,.566.678.926,1.712,1.409,1.072.501,2.288,1.07,2.288,2.323,0,1.186-1.225,1.812-1.276,1.838-.072.036-.148.053-.224.053-.183,0-.359-.101-.447-.276-.123-.247-.023-.547.224-.671.005-.002.724-.387.724-.943,0-.574-.678-.934-1.712-1.417-1.072-.501-2.288-1.07-2.288-2.323,0-.391.339-1.018.662-1.527C2.444,15.914,0,11.021,0,6.9,0,3.095,3.028,0,6.75,0c2.833,0,5.263,1.793,6.263,4.327.879-2.021,2.817-3.327,5.237-3.327,3.332,0,5.75,2.475,5.75,5.885,0,4.096-2.372,8.838-5.477,9.103-.441.764-.604,1.386-.484,1.852.172.665.932,1.087,1.735,1.534,1.043.58,2.226,1.238,2.226,2.626ZM12.5,6.9c0-3.253-2.579-5.9-5.75-5.9S1,3.646,1,6.9c0,4.096,2.653,9.1,5.75,9.1s5.75-5.004,5.75-9.1Zm5.75,8.1c2.631,0,4.75-4.439,4.75-8.115,0-2.876-1.953-4.885-4.75-4.885s-4.75,2.009-4.75,4.885c0,3.676,2.119,8.115,4.75,8.115Z"/>
                                </svg>
                                <p><nobr>행사</nobr></p>
                            </div>
                        </div>
                        <div className='sidebarTravelChoice3'>
                            <div className='sidebarTravelChoice3Wrap' onClick={()=>{sidebarTravelChoice3WrapSvgColor();accommodationdata();setLst();setInfoSidebarOpenClose();sidebarTravelChoice1CategoryShowX();sidebarTravelListO3Click();setMobileSidebarButton(false);setTimeout(()=>{setMobileSidebarButton(true)},800)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M18,13.5c0-.276,.224-.5,.5-.5h1c.276,0,.5,.224,.5,.5s-.224,.5-.5,.5h-1c-.276,0-.5-.224-.5-.5Zm.5,4.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5ZM14.5,6h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5Zm4,0h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5Zm0,4h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5Zm-3-1h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5ZM19.5,0h-5c-2.481,0-4.5,2.019-4.5,4.5v3c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-3c0-1.93,1.57-3.5,3.5-3.5h5c1.93,0,3.5,1.57,3.5,3.5v15c0,1.93-1.57,3.5-3.5,3.5h-3c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h3c2.481,0,4.5-2.019,4.5-4.5V4.5c0-2.481-2.019-4.5-4.5-4.5Zm-4.5,15.848v4.152c0,2.206-1.794,4-4,4H4c-2.206,0-4-1.794-4-4v-4.152c0-1.393,.63-2.685,1.727-3.544l3-2.348c1.633-1.277,3.915-1.277,5.546,0l3.001,2.348c1.097,.859,1.727,2.151,1.727,3.544Zm-1,0c0-1.083-.489-2.088-1.344-2.757l-3-2.348c-.635-.496-1.396-.745-2.156-.745s-1.521,.249-2.157,.745l-2.999,2.348c-.854,.669-1.344,1.674-1.344,2.757v4.152c0,1.654,1.346,3,3,3h7c1.654,0,3-1.346,3-3v-4.152Zm-4,.652v2c0,.827-.673,1.5-1.5,1.5h-2c-.827,0-1.5-.673-1.5-1.5v-2c0-.827,.673-1.5,1.5-1.5h2c.827,0,1.5,.673,1.5,1.5Zm-1,0c0-.275-.225-.5-.5-.5h-2c-.275,0-.5,.225-.5,.5v2c0,.275,.225,.5,.5,.5h2c.275,0,.5-.225,.5-.5v-2Z"/></svg>
                                <p><nobr>숙소</nobr></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sidebarTravelList'>
                    <div className='sidebarTravelListX'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width='50' height='50'>
                            <path d="m17.814,5.392c-.098.101-.228.151-.357.151-.126,0-.252-.047-.35-.142l-4.043-3.948c-.165-.167-.358-.288-.564-.362v22.409c0,.276-.224.5-.5.5s-.5-.224-.5-.5V1.083c-.205.071-.398.187-.563.35l-4.091,3.928c-.199.19-.517.187-.707-.015-.191-.199-.186-.516.014-.707L10.239.716c.473-.466,1.123-.716,1.761-.716.624.016,1.297.265,1.77.744l4.037,3.941c.197.193.201.51.008.707Z"/>
                        </svg>
                        <p>테마를 선택해주세요.</p>
                    </div>
                    <div className='sidebarTravelListO'>
                        <div className='sidebarTravelChoice1Category'>
                            <div className='sidebarTravelChoice1Category1'>
                                <div className='sidebarTravelChoice1Category1-1'>
                                    <p onClick={()=>{const cat = "자연관광지";tourcategory(cat);sidebarTravelChoice1Category1_1Color();}}>자연관광지</p>
                                </div>
                                <div className='sidebarTravelChoice1Category1-2'>
                                    <p onClick={()=>{const cat = "역사관광지";tourcategory(cat);sidebarTravelChoice1Category1_2Color();}}>역사관광지</p>
                                </div>
                                <div className='sidebarTravelChoice1Category1-3'>
                                    <p onClick={()=>{const cat = "체험관광지";tourcategory(cat);sidebarTravelChoice1Category1_3Color();}}>체험관광지</p>
                                </div>
                                <div className='sidebarTravelChoice1Category1-4'>
                                    <p onClick={()=>{const cat = "산업관광지";tourcategory(cat);sidebarTravelChoice1Category1_4Color();}}>산업관광지</p>
                                </div>
                            </div>
                            <div className='sidebarTravelChoice1Category2'>
                                <div className='sidebarTravelChoice1Category2-1'>
                                    <p onClick={()=>{const cat = "건축/조형물";tourcategory(cat);sidebarTravelChoice1Category2_1Color();}}>건축/조형물</p>
                                </div>
                                <div className='sidebarTravelChoice1Category2-2'>
                                    <p onClick={()=>{const cat = "생활문화";tourcategory(cat);sidebarTravelChoice1Category2_2Color();}}>생활문화</p>
                                </div>
                                <div className='sidebarTravelChoice1Category2-3'>
                                    <p onClick={()=>{const cat = "레포츠";tourcategory(cat);sidebarTravelChoice1Category2_3Color();}}>레포츠</p>
                                </div>
                            </div>
                        </div>
                        <div className='sidebarTravelListO1'>
                            {sidebarclick==="1" && tourplace && tourplace.map((lst)=>(
                                <ul className='sidebarTravelListO1Ul' key={lst.index} onClick={()=>{setLst(lst); setInfoSidebarOpenClose('1');}}>
                                    <div className='sidebarTravelListO1Div'>
                                        <img src={lst.imgurl1!==null?lst.imgurl1:nullImg1}></img>
                                        <div className='sidebarTravelListO1DivInfo'>
                                            <div className='sidebarTravelListO1DivInfoTitle'>
                                                <p dangerouslySetInnerHTML={lst&&{__html:lst.title}}></p>
                                            </div>
                                            <div className='sidebarTravelListO1DivInfoAddress'>
                                                <div className='sidebarTravelListO1DivInfoAddressSvgWrap'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                                        <path d="M12,24c-1.358,0-2.642-.521-3.611-1.467l-4.152-3.818c-2.092-2.083-3.236-4.834-3.236-7.761s1.145-5.678,3.223-7.747C6.301,1.139,9.062,0,12,0s5.699,1.139,7.777,3.208h0c2.078,2.069,3.223,4.821,3.223,7.747s-1.145,5.678-3.223,7.747l-4.176,3.842c-.96,.936-2.243,1.457-3.602,1.457ZM12,1c-2.671,0-5.183,1.036-7.072,2.917-1.888,1.88-2.928,4.379-2.928,7.038s1.04,5.158,2.928,7.038l4.148,3.814c1.586,1.546,4.271,1.536,5.838,.01l4.172-3.838c1.874-1.866,2.914-4.366,2.914-7.024s-1.04-5.158-2.928-7.038h0c-1.89-1.881-4.401-2.917-7.072-2.917Zm-.441,12.563l6.293-6.207c.196-.194,.198-.51,.005-.707-.196-.197-.512-.199-.708-.005l-6.295,6.209c-.193,.195-.513,.195-.712-.005l-3.293-3.207c-.195-.191-.513-.188-.707,.01-.192,.198-.188,.514,.01,.707l3.288,3.202c.293,.293,.677,.439,1.062,.439,.383,0,.767-.146,1.058-.437Z"/>
                                                    </svg>
                                                </div>
                                                <p dangerouslySetInnerHTML={lst.address!==null?{__html:lst.address}:{__html:'정보없음'}}></p>
                                            </div>
                                            <div className='sidebarTravelListO1DivInfoTel'>
                                                <div className='sidebarTravelListO1DivInfoTelSvgWrap'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                                        <path d="m23.5,11c-.276,0-.5-.224-.5-.5,0-5.238-4.262-9.5-9.5-9.5-.276,0-.5-.224-.5-.5s.224-.5.5-.5c5.79,0,10.5,4.71,10.5,10.5,0,.276-.224.5-.5.5Zm-3.5-.5c0-3.584-2.916-6.5-6.5-6.5-.276,0-.5.224-.5.5s.224.5.5.5c3.033,0,5.5,2.467,5.5,5.5,0,.276.224.5.5.5s.5-.224.5-.5Zm2.234,11.771l.978-1.125c.508-.508.788-1.184.788-1.902s-.28-1.395-.837-1.945l-2.446-1.873c-1.048-1.048-2.753-1.049-3.803-.003l-1.532,1.494c-3.68-1.499-6.678-4.5-8.294-8.303l1.488-1.525c1.049-1.049,1.049-2.756.043-3.756l-1.959-2.543c-1.017-1.017-2.813-.993-3.78-.023l-1.174,1.024C.605,2.886,0,4.373,0,5.976c0,7.749,10.275,18.024,18.024,18.024,1.603,0,3.089-.605,4.21-1.729ZM5.909,1.446l1.959,2.543c.659.659.659,1.732-.004,2.396l-1.722,1.766c-.138.142-.18.352-.106.536,1.729,4.305,5.113,7.688,9.286,9.28.182.07.388.027.527-.108l1.766-1.722s.003-.003.004-.005c.639-.64,1.704-.681,2.44.043l2.446,1.873c.659.659.659,1.731-.023,2.416l-.979,1.125c-.908.91-2.144,1.411-3.479,1.411C10.864,23,1,13.136,1,5.976c0-1.335.501-2.571,1.387-3.456l1.175-1.025c.336-.336.779-.5,1.215-.5.419,0,.831.152,1.133.452Z"/>
                                                    </svg>
                                                </div>
                                                <p dangerouslySetInnerHTML={lst.tel!==null?{__html:lst.tel}:{__html:'정보없음'}}></p>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            ))}
                            {catNull}
                        </div>
                        <div className='sidebarTravelListO2'>
                            {sidebarclick==="2" && festival.length > 0 ? festival.map((lst)=>(
                                <ul className='sidebarTravelListO2Ul' key={lst.index} onClick={()=>{setLst(lst); setInfoSidebarOpenClose('1');}}>
                                    <div className='sidebarTravelListO2Div'>
                                        <img src={lst.imgurl1!==null?lst.imgurl1:nullImg1}></img>
                                        <div className='sidebarTravelListO2DivInfo'>
                                            <div className='sidebarTravelListO2DivInfoTitle'>
                                                <p dangerouslySetInnerHTML={lst&&{__html:lst.title}}></p>
                                            </div>
                                            <div className='sidebarTravelListO2DivInfoStartEnd'>
                                                <div className='sidebarTravelListO2DivInfoStartEndSvgWrap'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                                        <path d="M19.5,2h-1.5V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5H7V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5h-1.5C2.019,2,0,4.019,0,6.5v13c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V6.5c0-2.481-2.019-4.5-4.5-4.5ZM4.5,3h15c1.93,0,3.5,1.57,3.5,3.5v1.5H1v-1.5c0-1.93,1.57-3.5,3.5-3.5Zm15,20H4.5c-1.93,0-3.5-1.57-3.5-3.5V9H23v10.5c0,1.93-1.57,3.5-3.5,3.5Zm-.652-10.859c.192,.198,.188,.514-.01,.707l-6.596,6.424c-.484,.484-1.122,.727-1.762,.727s-1.281-.244-1.77-.732l-3.562-3.401c-.199-.19-.207-.507-.016-.707,.189-.2,.506-.208,.707-.016l3.569,3.409c.581,.582,1.562,.575,2.13,.008l6.601-6.429c.196-.191,.514-.189,.707,.01Z"/>
                                                    </svg>
                                                </div>
                                                <p dangerouslySetInnerHTML={lst&&lst.startdate!==null?{__html:lst.startdate+' ~ '+lst.enddate}:{__html:'정보없음'}}></p>
                                            </div>
                                            <div className='sidebarTravelListO2DivInfoAddress'>
                                                <div className='sidebarTravelListO2DivInfoAddressSvgWrap'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                                        <path d="M12,24c-1.358,0-2.642-.521-3.611-1.467l-4.152-3.818c-2.092-2.083-3.236-4.834-3.236-7.761s1.145-5.678,3.223-7.747C6.301,1.139,9.062,0,12,0s5.699,1.139,7.777,3.208h0c2.078,2.069,3.223,4.821,3.223,7.747s-1.145,5.678-3.223,7.747l-4.176,3.842c-.96,.936-2.243,1.457-3.602,1.457ZM12,1c-2.671,0-5.183,1.036-7.072,2.917-1.888,1.88-2.928,4.379-2.928,7.038s1.04,5.158,2.928,7.038l4.148,3.814c1.586,1.546,4.271,1.536,5.838,.01l4.172-3.838c1.874-1.866,2.914-4.366,2.914-7.024s-1.04-5.158-2.928-7.038h0c-1.89-1.881-4.401-2.917-7.072-2.917Zm-.441,12.563l6.293-6.207c.196-.194,.198-.51,.005-.707-.196-.197-.512-.199-.708-.005l-6.295,6.209c-.193,.195-.513,.195-.712-.005l-3.293-3.207c-.195-.191-.513-.188-.707,.01-.192,.198-.188,.514,.01,.707l3.288,3.202c.293,.293,.677,.439,1.062,.439,.383,0,.767-.146,1.058-.437Z"/>
                                                    </svg>
                                                </div>
                                                <p dangerouslySetInnerHTML={lst.address!==null?{__html:lst.address}:{__html:'정보없음'}}></p>
                                            </div>
                                            <div className='sidebarTravelListO2DivInfoTel'>
                                                <div className='sidebarTravelListO2DivInfoTelSvgWrap'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                                        <path d="m23.5,11c-.276,0-.5-.224-.5-.5,0-5.238-4.262-9.5-9.5-9.5-.276,0-.5-.224-.5-.5s.224-.5.5-.5c5.79,0,10.5,4.71,10.5,10.5,0,.276-.224.5-.5.5Zm-3.5-.5c0-3.584-2.916-6.5-6.5-6.5-.276,0-.5.224-.5.5s.224.5.5.5c3.033,0,5.5,2.467,5.5,5.5,0,.276.224.5.5.5s.5-.224.5-.5Zm2.234,11.771l.978-1.125c.508-.508.788-1.184.788-1.902s-.28-1.395-.837-1.945l-2.446-1.873c-1.048-1.048-2.753-1.049-3.803-.003l-1.532,1.494c-3.68-1.499-6.678-4.5-8.294-8.303l1.488-1.525c1.049-1.049,1.049-2.756.043-3.756l-1.959-2.543c-1.017-1.017-2.813-.993-3.78-.023l-1.174,1.024C.605,2.886,0,4.373,0,5.976c0,7.749,10.275,18.024,18.024,18.024,1.603,0,3.089-.605,4.21-1.729ZM5.909,1.446l1.959,2.543c.659.659.659,1.732-.004,2.396l-1.722,1.766c-.138.142-.18.352-.106.536,1.729,4.305,5.113,7.688,9.286,9.28.182.07.388.027.527-.108l1.766-1.722s.003-.003.004-.005c.639-.64,1.704-.681,2.44.043l2.446,1.873c.659.659.659,1.731-.023,2.416l-.979,1.125c-.908.91-2.144,1.411-3.479,1.411C10.864,23,1,13.136,1,5.976c0-1.335.501-2.571,1.387-3.456l1.175-1.025c.336-.336.779-.5,1.215-.5.419,0,.831.152,1.133.452Z"/>
                                                    </svg>
                                                </div>
                                                <p dangerouslySetInnerHTML={lst.tel!==null?{__html:lst.tel}:{__html:'정보없음'}}></p>
                                            </div>

                                        </div>
                                    </div>
                                </ul>
                            )) : <p className='sidebarTravelListInfoX'>정보가 없습니다.</p>}
                        </div>
                        <div className='sidebarTravelListO3'>
                            {sidebarclick==="3" && accommodation.length > 0 ? accommodation.map((lst)=>(
                                <ul className='sidebarTravelListO3Ul' key={lst.index} onClick={()=>{setLst(lst); setInfoSidebarOpenClose('1');}}>
                                <div className='sidebarTravelListO3Div'>
                                    <img src={lst.imgurl1!==null?lst.imgurl1:nullImg1}></img>
                                    <div className='sidebarTravelListO3DivInfo'>
                                        <div className='sidebarTravelListO3DivInfoTitle'>
                                            <p dangerouslySetInnerHTML={lst&&{__html:lst.title}}></p>
                                        </div>
                                        <div className='sidebarTravelListO3DivInfoAddress'>
                                            <div className='sidebarTravelListO3DivInfoAddressSvgWrap'>
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                                    <path d="M12,24c-1.358,0-2.642-.521-3.611-1.467l-4.152-3.818c-2.092-2.083-3.236-4.834-3.236-7.761s1.145-5.678,3.223-7.747C6.301,1.139,9.062,0,12,0s5.699,1.139,7.777,3.208h0c2.078,2.069,3.223,4.821,3.223,7.747s-1.145,5.678-3.223,7.747l-4.176,3.842c-.96,.936-2.243,1.457-3.602,1.457ZM12,1c-2.671,0-5.183,1.036-7.072,2.917-1.888,1.88-2.928,4.379-2.928,7.038s1.04,5.158,2.928,7.038l4.148,3.814c1.586,1.546,4.271,1.536,5.838,.01l4.172-3.838c1.874-1.866,2.914-4.366,2.914-7.024s-1.04-5.158-2.928-7.038h0c-1.89-1.881-4.401-2.917-7.072-2.917Zm-.441,12.563l6.293-6.207c.196-.194,.198-.51,.005-.707-.196-.197-.512-.199-.708-.005l-6.295,6.209c-.193,.195-.513,.195-.712-.005l-3.293-3.207c-.195-.191-.513-.188-.707,.01-.192,.198-.188,.514,.01,.707l3.288,3.202c.293,.293,.677,.439,1.062,.439,.383,0,.767-.146,1.058-.437Z"/>
                                                </svg>
                                            </div>
                                            <p dangerouslySetInnerHTML={lst.address!==null?{__html:lst.address}:{__html:'정보없음'}}></p>
                                        </div>
                                        <div className='sidebarTravelListO3DivInfoTel'>
                                            <div className='sidebarTravelListO3DivInfoTelSvgWrap'>
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="13" height="13">
                                                    <path d="m23.5,11c-.276,0-.5-.224-.5-.5,0-5.238-4.262-9.5-9.5-9.5-.276,0-.5-.224-.5-.5s.224-.5.5-.5c5.79,0,10.5,4.71,10.5,10.5,0,.276-.224.5-.5.5Zm-3.5-.5c0-3.584-2.916-6.5-6.5-6.5-.276,0-.5.224-.5.5s.224.5.5.5c3.033,0,5.5,2.467,5.5,5.5,0,.276.224.5.5.5s.5-.224.5-.5Zm2.234,11.771l.978-1.125c.508-.508.788-1.184.788-1.902s-.28-1.395-.837-1.945l-2.446-1.873c-1.048-1.048-2.753-1.049-3.803-.003l-1.532,1.494c-3.68-1.499-6.678-4.5-8.294-8.303l1.488-1.525c1.049-1.049,1.049-2.756.043-3.756l-1.959-2.543c-1.017-1.017-2.813-.993-3.78-.023l-1.174,1.024C.605,2.886,0,4.373,0,5.976c0,7.749,10.275,18.024,18.024,18.024,1.603,0,3.089-.605,4.21-1.729ZM5.909,1.446l1.959,2.543c.659.659.659,1.732-.004,2.396l-1.722,1.766c-.138.142-.18.352-.106.536,1.729,4.305,5.113,7.688,9.286,9.28.182.07.388.027.527-.108l1.766-1.722s.003-.003.004-.005c.639-.64,1.704-.681,2.44.043l2.446,1.873c.659.659.659,1.731-.023,2.416l-.979,1.125c-.908.91-2.144,1.411-3.479,1.411C10.864,23,1,13.136,1,5.976c0-1.335.501-2.571,1.387-3.456l1.175-1.025c.336-.336.779-.5,1.215-.5.419,0,.831.152,1.133.452Z"/>
                                                </svg>
                                            </div>
                                            <p dangerouslySetInnerHTML={lst.tel!==null?{__html:lst.tel}:{__html:'정보없음'}}></p>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                            )) : <p className='sidebarTravelListInfoX'>정보가 없습니다.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarTravel;