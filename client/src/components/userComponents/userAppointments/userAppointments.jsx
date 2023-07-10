import { useCallback, useEffect, useState } from 'react';
import './userAppointments.css';
import axios from 'axios';
import { useSocket } from '../../../context/socket/socketProvider';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserAppointments() {

    const [appointments, setAppointments] = useState('');
    const userToken = localStorage.getItem('userToken');
    const socket = useSocket()
    const navigate = useNavigate()
    const email = useSelector(state => state.user.data.email)


    const handleCancelAppointment = useCallback(async (id) => {
        console.log(id);
        await axios.post(import.meta.env.VITE_BASE_URL + `cancelAppoint/${id}`,

            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.data == 'blocked') {
                    history('/login')
                    localStorage.removeItem('userToken')
                } else {
                    const updatedArray = appointments.length != 0 && appointments.map((item) => {
                        if (item._id === id) {
                            console.log(1);
                            return {
                                ...item,
                                isCancelled: true
                            }
                        }
                        return item
                    })
                    console.log(updatedArray);
                    setAppointments(updatedArray)
                }
            }
            )
    }, [appointments, userToken])

    useEffect(() => {
        async function datacall() {
            await axios
                .get(import.meta.env.VITE_BASE_URL + 'appointments', {
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data == 'blocked') {
                        localStorage.removeItem('userToken')
                        history('/login')
                    } else {

                        setAppointments(res.data);
                    }
                });
        }
        datacall();
    }, [userToken]);


    const handleJoin = useCallback((roomId) => {
        const room = roomId
        socket.emit("room:join", { email, room })
    }, [socket, email])

    const handleJoinRoom = useCallback((data) => {
        const { room } = data
        navigate(`/call/${room}`)
    }, [navigate])

    useEffect(() => {
        socket.on('room:join', handleJoinRoom)
        return () => {
            socket.off('room:join', handleJoinRoom)
        }
    }, [socket, handleJoinRoom])


    return (
        <>
            <div className="appoints text-center p-3 m-5">
                <h2>Appointments</h2>
                {appointments ? (appointments.length != 0 &&
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
                                            {new Date(el.date) < new Date() ? 'Unavailable' : el.isAttended ? "Attended" : !el.isCancelled ? <><button className='btn bg-danger text-white ps-2 pe-2 ' onClick={() => handleCancelAppointment(el._id)} style={{ fontSize: "15px" }}>Cancel</button> <button style={{ fontSize: "15px" }} className='btn ps-2 pe-2 btn-outline-success' onClick={() => handleJoin(el._id + el.user)}>Join</button></> : 'cancelled'}
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
