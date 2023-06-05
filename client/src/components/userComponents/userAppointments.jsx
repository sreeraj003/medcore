import React, { useEffect, useState } from 'react';
import './userAppointments.css';
import axios from 'axios';

function UserAppointments() {
    const [appointments, setAppointments] = useState('');
    const userToken = localStorage.getItem('userToken');

    useEffect(() => {
        async function datacall() {
            await axios
                .get(import.meta.env.VITE_BASE_URL + 'appointments', {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                .then(res => {
                    setAppointments(res.data);
                });
        }
        datacall();
    }, []);

    console.log(appointments);

    return (
        <>
            <div className="appoints text-center p-3 m-5">
                <h2>Appointments</h2>
                {appointments ? (
                    appointments.map(el => (
                        <div className="appointCard text-center      mt-3 p-3" key={el._id}>
                            <div className="row">
                                <div className="col-md-4 text-start">
                                    <h4>{el.docData[0].name}</h4>
                                    <h6 className='subText p-0 m-0'>zsfg</h6>
                                    <h6 className='subText'>sd</h6>
                                </div>
                                <div className="col-md-4">
                                    <h6>Date : {el.date}</h6>
                                    <h6>Time : {el.time}</h6>
                                </div>
                                <div className="col-md-4">
                                   {
                                    <>
                                   { } <br />
                                    {new Date(el.date)<new Date()?'Unavailable':el.isAttended ? "Attended":<button className='btn btn-outline-success ps-2 pe-2 ' style={{fontSize:"15px"}}>Cancel</button> }
                                    </>
                                   }
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>
        </>
    );
}

export default UserAppointments;
