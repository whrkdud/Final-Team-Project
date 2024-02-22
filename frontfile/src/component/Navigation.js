import { useContext } from 'react';
import { Context } from '../context/Context';
import '../css/navigation.css';

function Navigation(props) {
    const {setInfoSidebarOpenClose, setSidebarClick, setSidebarTravelChoice} = useContext(Context)
    const testNavigation1 = ()=>{
        const navigationCongestionButtonSvg = document.querySelector('.navigationCongestionButton svg');
        const navigationTravelButtonSvg = document.querySelector('.navigationTravelButton svg');

        navigationCongestionButtonSvg.style.fill = '#F78CA2';
        navigationTravelButtonSvg.style.fill = 'black';
        props.setTestState('1');
    }
    const testNavigation2 = ()=>{
        const navigationTravelButtonSvg = document.querySelector('.navigationTravelButton svg');
        const navigationCongestionButtonSvg = document.querySelector('.navigationCongestionButton svg');
    
        navigationTravelButtonSvg.style.fill = '#9FBB73';
        navigationCongestionButtonSvg.style.fill = 'black';
        props.setTestState('2');
    }
        
    return(
        <div className='navigation'>
            <div className='navigationCongestionButton'>
                <div onClick={()=>{testNavigation1();setInfoSidebarOpenClose();setSidebarClick();setSidebarTravelChoice('x');}} title='혼잡도 지도 보기'>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="25" height="25" viewBox="0 0 24 24"><path d="M24,17.5c0-1.385-.236-2.748-.702-4.051l-.879-2.462c-.638-1.786-2.341-2.986-4.238-2.986h-5.362c-1.896,0-3.6,1.2-4.238,2.987l-.879,2.461c-.466,1.304-.702,2.667-.702,4.052,0,1.393,.819,2.599,2,3.162v1.338c0,1.103,.897,2,2,2s2-.897,2-2v-1h5v1c0,1.103,.897,2,2,2s2-.897,2-2v-1.338c1.181-.563,2-1.769,2-3.162Zm-15.356-3.715l.879-2.461c.497-1.39,1.821-2.323,3.296-2.323h5.362c1.475,0,2.8,.934,3.296,2.323l.879,2.462c.143,.399,.261,.805,.357,1.215H8.287c.095-.41,.214-.816,.357-1.215Zm3.356,8.215c0,.551-.449,1-1,1s-1-.449-1-1v-1.036c.163,.023,.33,.036,.5,.036h1.5v1Zm9,0c0,.551-.449,1-1,1s-1-.449-1-1v-1h1.5c.17,0,.337-.012,.5-.036v1.036Zm-.5-2H10.5c-1.378,0-2.5-1.122-2.5-2.5,0-.504,.035-1.005,.103-1.5h2.897v1.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-1.5h7v1.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-1.5h2.897c.068,.495,.103,.996,.103,1.5,0,1.378-1.122,2.5-2.5,2.5ZM5.5,12H3.5c-1.378,0-2.5-1.122-2.5-2.5,0-.504,.035-1.005,.103-1.5h2.897v1.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-1.5h3.5c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5H1.287c.095-.41,.214-.816,.357-1.215l.879-2.461c.497-1.39,1.821-2.323,3.296-2.323h5.362c1.475,0,2.8,.934,3.296,2.323l.837,2.345c.092,.26,.379,.396,.639,.303,.26-.093,.396-.379,.303-.639l-.837-2.346c-.638-1.786-2.341-2.986-4.238-2.986H5.819C3.922,0,2.219,1.2,1.581,2.987l-.879,2.461c-.466,1.304-.702,2.667-.702,4.052,0,1.394,.818,2.599,2,3.162v1.338c0,1.103,.897,2,2,2s2-.897,2-2v-1.5c0-.276-.224-.5-.5-.5Zm-.5,2c0,.551-.449,1-1,1s-1-.449-1-1v-1.036c.164,.023,.33,.036,.5,.036h1.5v1Z"/></svg>
                    <p><nobr>혼잡도 지도</nobr></p>
                </div>
            </div>
            <div className='navigationTravelButton'>
                <div onClick={()=>{testNavigation2()}} title='여행지 추천 지도 보기'>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width='25' height='25'>
                        <path d="m10.239,14.782c.487.477,1.128.714,1.767.714.632,0,1.262-.233,1.736-.697l3.207-2.849c1.322-1.322,2.051-3.08,2.051-4.95s-.729-3.627-2.051-4.95c-1.321-1.322-3.079-2.05-4.949-2.05s-3.628.728-4.95,2.05c-2.729,2.729-2.729,7.17.021,9.92l3.168,2.812ZM7.757,2.757c1.134-1.133,2.641-1.757,4.243-1.757s3.109.624,4.242,1.757c1.134,1.133,1.758,2.64,1.758,4.243s-.624,3.109-1.736,4.222l-3.203,2.845c-.584.573-1.536.57-2.14-.017l-3.164-2.808c-2.339-2.339-2.339-6.146,0-8.485Zm4.243,7.223c1.648,0,2.99-1.341,2.99-2.99s-1.342-2.99-2.99-2.99-2.99,1.341-2.99,2.99,1.342,2.99,2.99,2.99Zm0-4.98c1.098,0,1.99.893,1.99,1.99s-.893,1.99-1.99,1.99-1.99-.893-1.99-1.99.893-1.99,1.99-1.99Zm12,12.016c0,.176-.092.339-.243.429l-10.31,6.186c-.446.268-.946.402-1.447.402s-1.001-.135-1.447-.402L.243,17.444c-.151-.09-.243-.253-.243-.429s.092-.339.243-.429l5-3c.234-.143.544-.065.686.172.143.236.065.544-.172.686l-4.285,2.571,9.595,5.757c.576.346,1.291.346,1.867,0l9.595-5.757-4.311-2.587c-.237-.142-.314-.449-.172-.686.143-.237.452-.314.686-.172l5.025,3.016c.151.091.243.253.243.429Z"/>
                    </svg>
                    <p><nobr>여행지 지도</nobr></p>
                </div>
            </div>
        </div>
    )
}

export default Navigation;