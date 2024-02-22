import '../css/header.css';
import Navigation from './Navigation';
import headerLogo from '../img/logo4.png';
import { Context } from '../context/Context';
import { useContext } from 'react';

function Header(/*props*/) {
    const { setContext,isMobile,setMobileSidebarButton,mobileSidebarButton } = useContext(Context);

    const jeogiReset = ()=>{
        window.location.reload();
    }

    const sidebarOption = () => {
        if(mobileSidebarButton===true){
            setMobileSidebarButton(false)
        }else{
            setMobileSidebarButton(true)
        }
    }

    return(
        <div className='header'>
            {isMobile===true?
            <div className='mobileSidebar' onClick={()=>{sidebarOption()}}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><rect y="11" width="24" height="1"/><rect y="4" width="24" height="1" rx="1"/><rect y="18" width="24" height="1" rx="1"/></svg>
            </div>:""}
            <div className='headerLogo'>
                {/* <img src={headerLogo}></img> */}
                <div className='headerLogoWrap' onClick={()=>{jeogiReset();}}>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12,24c-1.358,0-2.641-.521-3.612-1.467l-4.151-3.818c-2.093-2.083-3.237-4.834-3.237-7.761s1.144-5.678,3.222-7.747C6.3,1.139,9.062,0,12,0s5.7,1.139,7.777,3.208c2.078,2.069,3.223,4.821,3.223,7.747s-1.145,5.678-3.223,7.747l-4.176,3.842c-.96,.936-2.243,1.457-3.602,1.457Zm0-23c-2.672,0-5.183,1.036-7.072,2.917-1.889,1.88-2.928,4.379-2.928,7.038s1.04,5.158,2.928,7.038l4.147,3.814c1.587,1.546,4.273,1.536,5.838,.01l4.172-3.838c1.874-1.866,2.914-4.366,2.914-7.024s-1.04-5.158-2.929-7.038c-1.889-1.881-4.4-2.917-7.071-2.917Zm4.354,11.197c.195-.195,.195-.512,0-.707s-.512-.195-.707,0c-.974,.974-2.269,1.51-3.646,1.51s-2.672-.536-3.646-1.51c-.195-.195-.512-.195-.707,0s-.195,.512,0,.707c1.163,1.163,2.709,1.803,4.354,1.803s3.191-.641,4.354-1.803Zm-7.353-5.197c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm6,0c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Z"/>
                    </svg>
                    <p><nobr>저 기 어 때</nobr></p>
                </div>
            </div>
            {/* <div className='headerNaviration'>
                <Navigation testState={props.testState} setTestState={props.setTestState}/>
            </div> */}
            <div className='headerDataOrigin'>
                <svg onMouseOver={()=>{setContext('1')}} onMouseOut={()=>{setContext('2')}} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                    <path d="m17.987,2.28C16.075.575,13.507-.233,10.937.062c-3.993.458-7.293,3.675-7.846,7.647-.421,3.014.678,6.01,2.939,8.013,1.252,1.109,1.97,2.725,1.97,4.431v.348c0,1.93,1.57,3.5,3.5,3.5h1c1.93,0,3.5-1.57,3.5-3.5v-.353c0-1.686.752-3.309,2.118-4.571,1.831-1.694,2.882-4.091,2.882-6.576,0-2.563-1.098-5.012-3.013-6.72Zm-2.987,18.22c0,1.378-1.121,2.5-2.5,2.5h-1c-1.379,0-2.5-1.122-2.5-2.5v-.348c0-.389-.033-.775-.095-1.152h6.195c-.066.377-.1.76-.1,1.147v.353Zm2.439-5.658c-.987.912-1.695,1.993-2.087,3.158h-6.69c-.374-1.161-1.048-2.21-1.969-3.027-2.01-1.78-2.986-4.444-2.612-7.126.491-3.528,3.422-6.384,6.969-6.792.323-.037.644-.055.962-.055,1.968,0,3.825.703,5.311,2.027,1.701,1.518,2.678,3.695,2.678,5.973,0,2.24-.909,4.315-2.561,5.842Zm-5.939-3.342v-7c0-.276.224-.5.5-.5s.5.224.5.5v7c0,.276-.224.5-.5.5s-.5-.224-.5-.5Zm1.5,3.5c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z"/>
                    </svg>
            </div>
        </div>
    )
}

export default Header;