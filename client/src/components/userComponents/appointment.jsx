import React, { useEffect, useState } from 'react'
import './appointment.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import { setAppointment } from '../../redux/appointment'
import axios from 'axios'

function Appointment() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const docData = useSelector(state => state.selectedDoc.doc)
    const userData = useSelector(state => state.user.data)

    const [schedule, setSchedule] = useState([])
    const [sessionDate, setSessionDate] = useState('Date')
    const [sessionTime, setSessionTime] = useState('Time')
    const [timeList, setTimeList] = useState(['No data'])
    const [issues,setIssues]=useState('')

    const userToken = localStorage.getItem('userToken')

    useEffect(() => {
        async function datacall() {
            if (!docData.doctorData) {
                history('/findDoctor')
            } else {
                await axios.get(import.meta.env.VITE_BASE_URL + `docSchedule/${docData._id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }).then(res => {
                    setSchedule(res.data)
                })
            }
        }
        datacall()
    }, [])

    const handleDate = (date) => {
        setSessionDate(date)
        const list = schedule.filter(el => el.date == date)
        setTimeList(list[0].time)
    }

    const handleSubmit = async () => {
        const data = {
            doctor: docData._id,
            user: userData._id,
            date: sessionDate,
            time: sessionTime,
            issues:issues,
            fee: docData.fee
        }
        dispatch(setAppointment(data))
        history('/payment')
    }

    return (
        <>
            <div className="mx-auto slice w-50 mt-5 ps-5 pe-5 pb-5 app-div">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-12 mt-5 text-center">
                                <h4><b>Patient Details</b></h4>
                            </div>
                            <div className="col-5 text-end">
                                <p>         Name :</p>
                                <p>          Age :</p>
                                <p>       Gender :</p>
                                <p>      Address :</p>
                                <p>Health issues :</p>
                            </div>
                            <div className="col-7">
                                <p>{userData?.userName}</p>
                                <p>{userData?.age}</p>
                                <p>{userData?.gender}</p>
                                <p>{userData?.address}</p>
                                <textarea name="issues" id="" value={issues} onChange={(e)=>setIssues(e.target.value)} className='form-control' cols="30" rows="5" placeholder='Enter your health issues here...' />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-12 mt-5 text-center">
                                <h4><b>Doctor Details</b></h4>
                            </div>
                            <div className="col-12 text-center">
                                <h5>Dr.{docData?.name}</h5>
                                <div className='text-secondary'>{docData.doctorData ? docData?.doctorData[0]?.name : ''}</div>
                                <div className='text-secondary'>{docData?.qualification}</div>
                                <div><b>Fee : <span className='text-success'>{docData.fee}</span></b></div>
                                <div className=''>
                                    <b>Session Timing </b>
                                    <div className="dropdown">
                                        <button className="btn p-1 bg-light btn-outline-dark mt-2 text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ minWidth: '150px', fontSize: "14px" }}>
                                            {sessionDate}
                                        </button>
                                        <ul className="dropdown-menu">
                                            {schedule && schedule.map(el => {

                                                return (<li><button className='btn p-0 bg-light listbutt' onClick={() => handleDate(el.date)}>{el.date}</button></li>)

                                            })}
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn p-1 bg-light btn-outline-dark mt-2  text-dark dropdown-toggle" style={{ minWidth: '150px', fontSize: "14px" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {sessionTime}
                                        </button>
                                        <ul className="dropdown-menu">
                                            {timeList && timeList.map(el => <li><button className='btn p-0  bg-light listbutt' onClick={() => setSessionTime(el)}>{el}</button></li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-center align-items-center">
                        <button className='btn p-1 btn-outline-success' onClick={handleSubmit}>Book Slot <BsPlusLg style={{ marginTop: '-2px' }} /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appointment