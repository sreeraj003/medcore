import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './District.css';

const socket = io('http://localhost:5000');

export default function Dynamic() {


    const [counts, setCounts] = useState([]);

    useEffect(() => {
        socket.on("counts", (data) => {
            setCounts(data);
        });
    }, []);

    const districtNames = [
        { name: "ಬೆಂಗಳೂರು", totalseats: 28 },
        { name: "ದಕ್ಷಿಣ ಕನ್ನಡ", totalseats: 8 },
        { name: "ಬೆಳಗಾವಿ", totalseats: 18 },
        { name: "ಬೀದರ್", totalseats: 6 },
        { name: "ಚಾಮರಾಜನಗರ", totalseats: 4 },
        { name: "ಧಾರವಾಡ", totalseats: 7 },
        { name: "ಗುಲ್ಬರ್ಗ", totalseats: 9 },
        { name: "ಹಾವೇರಿ", totalseats: 6 },
        { name: "ಕೋಲಾರ", totalseats: 6 },
        { name: "ಮಂಡ್ಯ", totalseats: 7 },
        { name: "ರಾಯಚೂರು", totalseats: 7 },
        { name: "ಶಿವಮೊಗ್ಗ", totalseats: 7 },
        { name: "ಉಡುಪಿ", totalseats: 5 },
        { name: "ಉತ್ತರ ಕನ್ನಡ", totalseats: 6 },
        { name: "ಯಾದಗಿರಿ", totalseats: 4 },
        { name: "ತುಮಕೂರು", totalseats: 11 },
        { name: "ರಾಮನಗರ", totalseats: 4 },
        { name: "ಮೈಸೂರು", totalseats: 11 },
        { name: "ಕೊಪ್ಪಳ", totalseats: 5 },
        { name: "ಕೊಡಗು", totalseats: 2 },
        { name: "ಹಾಸನ", totalseats: 7 },
        { name: "ಗದಗ", totalseats: 4 },
        { name: "ದಾವಣಗೆರೆ", totalseats: 8 },
        { name: "ಚಿತ್ರದುರ್ಗ", totalseats: 6 },
        { name: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", totalseats: 5 },
        { name: "ಬಿಜಾಪುರ", totalseats: 8 },
        { name: "ಬಳ್ಳಾರಿ", totalseats: 5 },
        { name: "ವಿಜಯನಗರ", totalseats: 4 },
        { name: "ಬೆಂಗಳೂರು ಗ್ರಾಮೀಣ", totalseats: 4 },
        { name: "ಬಾಗಲಕೋಟೆ", totalseats: 7 },
        { name: "ಚಿಕ್ಕಮಗಳೂರು", totalseats: 5 },
    ];

    const parties = [
        "CONG",
        "BJP",
        "JDS",
        "OTH"

    ];

    const partyColors = ['#3D78B4', 'orange', 'green', 'grey'];

    function getColor(partyIndex) {
        return partyColors[partyIndex % partyColors.length];
    }

    const totalByDistrict = counts.reduce((acc, curr, i) => {
        const districtIndex = Math.floor(i / parties.length);
        const partyIndex = i % parties.length;
        acc[districtIndex] = acc[districtIndex] || { total: 0 };
        acc[districtIndex][parties[partyIndex]] = curr;
        acc[districtIndex].total += curr;
        return acc;
    }, []);


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: 'linear',
        pauseOnHover: false,
        rtl: true
    };
    return (
        <div>
            <Slider {...settings} style={{ width: '160px' }}>
                {districtNames.map((district, districtIndex) => (
                    <div key={district} className="containerUpdate">
                        <h1 className='Distname' style={{ textAlign: 'center' }}>{district.name}</h1>
                        <div key="total" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <h2 className="Count" style={{color:'white',marginTop: '12px',lineHeight:'35px'}} >{district.totalseats}/</h2>
                            <h2 className="Count" style={{color:'white',marginTop: '12px',lineHeight:'35px'}} >{totalByDistrict[districtIndex]?.total || 0}</h2>
                        </div>
                        <div className="count-container">
                            {parties.map((party, partyIndex) => {
                                const index = districtIndex * parties.length + partyIndex;
                                return (
                                    <div key={party} className="parent-container">
                                        <div className="party">
                                            <h2 className="Name" style={{ margin: "0px", backgroundColor: getColor(partyIndex) }}>{party}</h2>
                                        </div>
                                        <div className="count">
                                            <h2 className="Count" style={{ margin: "0px" }}>{counts[index]}</h2>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}