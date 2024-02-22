import { useEffect, useState, useContext } from 'react';
import '../css/travel.css';
import { Map, MapMarker, Polygon, CustomOverlayMap } from "react-kakao-maps-sdk";
import sig from '../json/sig.json';
import { Context } from '../context/Context';


function Travel() {
    // polygon 그리기
    const [sigSwitch, setSigSwitch] = useState([]);

    // polygon 클릭시 지역 나오는 함수
    const [level, setLevel] = useState(12);
    const [position, setPosition] = useState({
        lat: 36.45,
        lng: 127.77
    });

    //모바일 모델
    const [mobilelevel, setMobileLevel] = useState(13);

    const [markers,setMarkers] = useState([]);

    const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);

    const [fillColor, setFillColor] = useState([]);


    //useContext를 이용해 sidebar에서 backend에서 통신한 값 받아오기 
    const {setSigid,tourplace,festival,accommodation,sidebarclick,setSidebarClick,lst,setLst,setTourPlace,setFestival,setAccommodation,setInfoSidebarOpenClose,setSidebarTravelChoice,setLocationName,setLocationCongest,isMobile,setMobileSidebarButton,congestionData} = useContext(Context);

    // polygon 클릭시 확대하고 색깔 바꾸는 함수
    const polygonClick = (index, e,_) => {
        setLevel(9);
        setMobileLevel(10);
        setPosition({ lat: e.latLng.Ma, lng: e.latLng.La });
        // 선택한 Polygon이 이미 선택되어 있는지 확인
        if (selectedPolygonIndex === index) {
            setLevel(12); // 확대 레벨 원래대로 복원
            setMobileLevel(13);
            setSelectedPolygonIndex(null); // 선택 해제
            setMarkers() //마커 초기화
            setPosition({lat: 36.45,lng: 127.77}) //맵중앙으로 이동
            setSidebarTravelChoice('x');
            setSidebarClick();
            setInfoSidebarOpenClose();
        } else {
            setMarkers() //마커 초기화
            setSelectedPolygonIndex(index); // 선택된 Polygon의 인덱스 업데이트
            let sigid = sig.features[index].properties.SIG_CD;
            let location = sig.features[index].properties.SIG_KOR_NM;
            setLocationName(location)
            setLocationCongest(fillColor[index])
            setSigid(sigid);
            setLst();
            setTourPlace();
            setFestival();
            setAccommodation();
            setSidebarTravelChoice('o');
            setSidebarClick();
            setInfoSidebarOpenClose();
            setMobileSidebarButton(true);
        }
    }

    useEffect(() => {
        const features = sig.features;
        const colors = features.map(feature => getColor(feature.properties.SIG_CD));
        setFillColor(colors);
    },[congestionData])

    useEffect(() => {
        // polygon 그리는 함수
        const features = sig.features;
        const path1 = features.map(feature => (
            feature.geometry.coordinates.map(coords => (
                coords.map(coordinate => ({
                    lat: coordinate[1],
                    lng: coordinate[0]
                }))
            ))
        ))
        setSigSwitch(path1);
    }, []);

    useEffect(() => {
        mapmark()
    }, [sidebarclick, tourplace, festival, accommodation])

    const mapmark = () => {
        let newmarker = []
        if (sidebarclick === "1" && tourplace) {
            newmarker =
                tourplace.map((i, index) => (
                    <MapMarker // 마커를 생성합니다
                        key={index}
                        position={{ lat: i.lng, lng: i.lat }}// 마커가 표시될 위치입니다
                        clickable={true}
                        onClick={() => { setInfoSidebarOpenClose("1"); setLst(i);}}
                    />
                ))

        } else if (sidebarclick === "2" && festival) {
            newmarker =
                festival.map((i, index) => (
                    <MapMarker // 마커를 생성합니다
                        key={index}
                        position={{ lat: i.lng, lng: i.lat }}// 마커가 표시될 위치입니다
                        clickable={true}
                        onClick={() => { setInfoSidebarOpenClose("1"); setLst(i); }}
                    />
                ))

        } else if (sidebarclick === "3" && accommodation) {
            newmarker =
                accommodation.map((i, index) => (
                    <MapMarker // 마커를 생성합니다
                        key={index}
                        position={{ lat: i.lng, lng: i.lat }}// 마커가 표시될 위치입니다
                        clickable={true}
                        onClick={() => { setInfoSidebarOpenClose("1"); setLst(i);}}
                    />
                ))
        }
        setMarkers(newmarker)
    }

    const getColor = (key) => {
        const data = congestionData && congestionData.find(item => item.loc_code === key);
        const congestionLevel = data && data.jam;
        // 혼잡도에 따라 색상 설정
        if (congestionLevel === 1) {
            return "rgb(140, 192, 222)";
        } else if (congestionLevel === 2) {
            return "rgb(153, 188, 133)";
        } else if (congestionLevel === 3) {
            return "rgb(243, 209, 121)";
        } else if (congestionLevel === 4) {
            return "rgb(240, 152, 114)";
        } else if (congestionLevel === 5) {
            return "rgb(244, 96, 96)";
        } else {
            return "white";
        }
    };

    return (
        <div>
            <Map // 지도를 표시할 Container
                center={
                    // 지도의 중심좌표
                    position
                }
                style={{
                    // 지도의 크기
                    width: "100%",
                    height:
                    isMobile?
                    "93dvh":
                    "93vh"
                }}
                level={isMobile?mobilelevel:level} // 지도의 확대 레벨
                onZoomChanged={() => { setLevel();setMobileLevel();}}
            >
                {markers}

                {sigSwitch.map((coordinates, index) => (
                    <Polygon
                        key={index}
                        path={coordinates}
                        strokeWeight={0.5}
                        strokeColor="rgb(0, 0, 0, 0.5)"
                        strokeOpacity={0.8}
                        fillColor={fillColor[index]} // 선택된 Polygon만 파란색
                        fillOpacity={selectedPolygonIndex === index ? 0.7 : 0.3}
                        onClick={(_,e) => polygonClick(index,e)}
                        onMouseover={(e) => {
                            if (selectedPolygonIndex !== index) {
                                e.setOptions({ fillOpacity: '0.7' });
                            }
                        }}
                        onMouseout={(e) => {
                            if (selectedPolygonIndex !== index) {
                                e.setOptions({ fillOpacity: '0.3' });
                            }
                        }}
                    />
                ))}
                {sidebarclick==="1" && lst &&
                <CustomOverlayMap
                    position={{
                        lat:lst.lng,
                        lng:lst.lat
                    }}
                    xAnchor={0.5}
                    yAnchor={2.5}
                >
                    <div className='customOverlayMap'>
                        <p><nobr>{lst.title}</nobr></p>
                    </div>
                </CustomOverlayMap>
                }
                {sidebarclick==="2" && lst &&
                <CustomOverlayMap
                    position={{
                        lat:lst.lng,
                        lng:lst.lat
                    }}
                    xAnchor={0.5}
                    yAnchor={2.5}
                >
                    <div className='customOverlayMap'>
                        <p><nobr>{lst.title}</nobr></p>
                    </div>
                </CustomOverlayMap>
                }
                {sidebarclick==="3" && lst &&
                <CustomOverlayMap
                    position={{
                        lat:lst.lng,
                        lng:lst.lat
                    }}
                    xAnchor={0.5}
                    yAnchor={2.5}
                >
                    <div className='customOverlayMap'>
                        <p><nobr>{lst.title}</nobr></p>
                    </div>
                </CustomOverlayMap>
                }
                {/* <span className='travelMapLevelReset' onClick={reset} title='지도 전체 보기'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Bold" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve" width="35" height="35" fill='white'>
                        <path d="M288,192H160c-17.673,0-32,14.327-32,32s14.327,32,32,32h128c17.673,0,32-14.327,32-32S305.673,192,288,192z" />
                        <path d="M502.661,457.569l-99.046-99.067c74.18-99.06,54.01-239.499-45.05-313.678S119.067-9.187,44.887,89.873  s-54.01,239.499,45.05,313.678c79.587,59.597,188.929,59.623,268.544,0.063l99.088,99.088c12.452,12.452,32.64,12.452,45.092,0  c12.452-12.452,12.452-32.64,0-45.092L502.661,457.569z M225.116,384.49c-88.02,0-159.374-71.354-159.374-159.374  S137.097,65.742,225.116,65.742s159.374,71.354,159.374,159.374C384.397,313.097,313.098,384.397,225.116,384.49z" />
                    </svg>
                </span> */}
            </Map>
        </div>
    )
}

export default Travel;