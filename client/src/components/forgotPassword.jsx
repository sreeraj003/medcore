import axios from "axios";
import { useRef, useState } from "react";
import PropTypes from 'prop-types'
import { validateEmail } from "./validator";
import { useNavigate } from "react-router-dom";
ForgotPassword.propTypes = {
    value: PropTypes.string
}

function ForgotPassword({ value }) {

    const [errorMsg, setErrorMsg] = useState()
    const emailRef = useRef()
    const btnRef = useRef()
    const otpRef = useRef()
    const otpBtnRef = useRef()
    const history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validate = validateEmail(emailRef.current.value)
        if (!validate) {
            setErrorMsg('Please enter valid email address')
        } else {

            if (value == 'doctor') {
                await axios.get(import.meta.env.VITE_BASE_URL + `doctor/forgotPassword/${emailRef.current.value}`)
                    .then(res => {
                        if (res.data == 'success') {
                            setErrorMsg('')
                            btnRef.current.style.display = 'none'
                            otpRef.current.style.display = 'block'
                            otpBtnRef.current.style.display = 'block'
                        } else {
                            setErrorMsg('Email not found')
                        }
                    })
            } else if (!value) {
                await axios.get(import.meta.env.VITE_BASE_URL + `forgotPassword/${emailRef.current.value}`)
                    .then(res => {
                        if (res.data == 'success') {
                            setErrorMsg('')
                            btnRef.current.style.display = 'none'
                            otpRef.current.style.display = 'block'
                            otpBtnRef.current.style.display = 'block'
                        } else {
                            setErrorMsg('Email not found')
                        }
                    })
            }
        }
    }

    const handleOtp = async (e) => {
        e.preventDefault()
        if (value == 'doctor') {
            await axios.patch(import.meta.env.VITE_BASE_URL + `doctor/verifyOtp`, {
                email: emailRef.current.value,
                otp: otpRef.current.value
            }).then(
                res => {
                    console.log(res.data);
                    if (res.data == 'valid') {
                        history(`/doctor/newPassword/${emailRef.current.value}`)
                    } else {
                        setErrorMsg('invalid otp')
                    }
                }
            )
        } else if (!value) {
            await axios.patch(import.meta.env.VITE_BASE_URL + `verifyOtp`, {
                email: emailRef.current.value,
                otp: otpRef.current.value
            }).then(
                res => {
                    console.log(res.data);
                    if (res.data == 'valid') {
                        history(`/newPassword/${emailRef.current.value}`)
                    } else {
                        setErrorMsg('invalid otp')
                    }
                }
            )
        }
    }
    return (
        <div className="container mt-5">
            <h1 className="text-center text-success mb-4">Forgot Password</h1>
            <form>
                <div className="form-group w-50 m-auto text-center" >
                    {errorMsg ?
                        <div className="alert alert-danger" role="alert">
                            {errorMsg}
                        </div> : ''
                    }
                    <input type="text" ref={emailRef} className="form-control mb-3" placeholder="Enter your Email" />
                    <button type="submit" ref={btnRef} className="btn btn-success btn-block " onClick={(e) => handleSubmit(e)}>Submit</button>
                    <input className="form-control bt-3" ref={otpRef} type="text" style={{ display: 'none' }} placeholder="Enter otp" />
                    <button type="submit" ref={otpBtnRef} style={{ display: 'none' }} className="btn btn-success btn-block " onClick={(e) => handleOtp(e)}>Submit</button>
                </div>
            </form>

        </div>
    );
}

export default ForgotPassword