import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver';
import './view.css'
import axios from 'axios';

function View({ user, setSelected, value }) {

    const [msg, setMsg] = useState('')
    const [approveButton, setApproveButton] = useState('')
    const [blockButton, setBlockButton] = useState('')

    useEffect(() => {
        if (value == "doc") {
            if (user.isApproved == false) setApproveButton('Approve')
            else setApproveButton('Disapprove')
        }
        if (user.isBlocked == false) setBlockButton("Block")
        else setBlockButton("Unblock")
    })


    const downloadHandler = (e) => {
        const url = import.meta.env.VITE_BASE_URL + `images/${e.Target.value}`
        saveAs(url, "certificates")
    }

    const handleVerify = async (e, type) => {
        const adminToken = localStorage.getItem('adminToken')
        await axios.patch(import.meta.env.VITE_BASE_URL + `admin/manageDoctor/${e.target.value}`, { action: type }, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            }
        })
            .then(res => {
                if (res.data == "approved") {
                    setMsg("This account has been verified successfully")
                    user.isApproved = true
                } else if (res.data == "disapproved") {
                    setMsg("The account has been unverified.")
                    user.isApproved = false
                } else if (res.data == "blocked") {
                    setMsg("This account is blocked successfully.")
                    user.isBlocked = true
                } else if (res.data == "unblocked") {
                    setMsg("This account has been unbloacked.")
                    user.isBlocked = false
                } else setMsg("There was an unexpected error.")

                setSelected(user)
                setTimeout(() => {
                    setMsg('')
                }, 4000)
            })
    }
    return (
        <>
            <div className='container' style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-12">
                        <div style={{ width: "90%", outline: "2px solid #28a745", borderRadius: '10px' }} className='m-auto p-3 bg-white'>
                            <button className='btn btn-outline-success bg-light' onClick={() => setSelected('')}>back</button>
                            <div className='text-center '>
                                {
                                    user.image ?
                                        <img width={'200px'} src={import.meta.env.VITE_BASE_URL + `images/${user.image}`} alt="sdf" />
                                        :
                                        <img width={'200px'} src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="dedf" />
                                }
                                <h1>{user.name}</h1>
                                {
                                    msg == "There was an unexpected error." ?
                                        <div className='alert alert-danger'>{msg}</div>
                                        : msg == '' ?
                                            ''
                                            :
                                            <div className='alert alert-success'>{msg}</div>
                                }
                                <div className="row">
                                    <div className="col-lg-6 text-start ">
                                        <b>Email</b>:{user.email} <br />
                                        <b>Contact</b>:{user.contact}<br />
                                        <b>Age</b>:{user.age}<br />
                                        <b>Gender</b>:{user.gender}<br />
                                        <b>Created</b> : {user.timeStamp}<br />
                                        {
                                            value == "doc" && <div> <b>Is-Approved</b> : {!user.isApproved ? "Not Approved" : "Approved"} <br /></div>
                                        }
                                        {
                                            <div><b>Is-Blocked</b> : {!user.isBlocked ? "Not Blocked" : "Blocked"} <br /></div>
                                        }
                                    </div>
                                    <div className="col-lg-6 text-start">
                                        {
                                            value == "doc" ? <div>
                                                <b>Consultation fee</b>:{user.fee}<br />
                                                <b>Department</b>:{user.dept[0].name}<br />
                                                <b>Qualification</b>:{user.qualification}<br />
                                                Documents
                                                <div className='horizontal-scroll-container d-flex flex-wrap'>
                                                    <div className="horizontal-scroll-content flex-raw d-flex">
                                                        {user ? user.documents.map((doc, index) => (

                                                            <div key={0 - index} className='d-flex flex-column'>
                                                                <img key={index}
                                                                    className='me-2 mt-2'
                                                                    width={'100px'}
                                                                    height={'80px'}
                                                                    src={import.meta.env.VITE_BASE_URL + `images/${doc}`}
                                                                    alt=''
                                                                />
                                                                <button key={index + '.' + index}
                                                                    className='me-2 mt-1 btn btn-outline-success p-0' value={doc} onClick={downloadHandler}
                                                                    style={{ fontSize: '10px' }}>
                                                                    Download
                                                                </button>

                                                            </div>
                                                        ))
                                                            : "Oopsie...!No Data found"
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                                : <div>
                                                    <b>Address</b>: {user.address}<br />
                                                </div>
                                        }


                                    </div>
                                </div>
                                <div className='mt-2'>
                                    {
                                        value == "doc" &&
                                        <button className='btn  btn-success me-2' value={user._id} onClick={(e) => handleVerify(e, "approve")}>{approveButton}</button>
                                    }
                                    <button className='btn block btn-danger' value={user._id} onClick={(e) => handleVerify(e, "block")}>{blockButton}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View