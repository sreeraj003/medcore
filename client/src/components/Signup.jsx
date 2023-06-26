import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import './Signup.css'
import { validateEmail, validateMobileNumber, validatePassword } from './validator';
import axios from 'axios'

Signup.propTypes = {
    value: PropTypes.string
}
function Signup({ value }) {
    const history = useNavigate()
    const [Name, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Age, setAge] = useState(1);
    const [Mobile, setMobile] = useState('');
    const [Password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Name || !Email || !Mobile || !Age || !Password) {
            setErrorMsg('Please fill all the blanks...!')
            return
        } else {

            if (!validateEmail(Email)) {
                setErrorMsg('Invalid Email id,Please enter valid email id...!')
                return;
            }

            if (!validateMobileNumber(Mobile)) {
                setErrorMsg("Mobile number can only have 10 digits,Please enter valid mobile number...!")
                return;
            }

            if (!validatePassword(Password)) {
                setErrorMsg('Password should have a capital letter,symbol,number and atleast have 6 charectors...!')
                return
            }

            if (Password != cPassword) {
                setErrorMsg("Passwords are not matching,Please try again...!")
                return;
            }

            if (Age <= 0 || Age > 120) {
                setErrorMsg('Please enter valid age...!')
                return
            }

            value == 'doctor' ?
                await axios.post(import.meta.env.VITE_BASE_URL + 'doctor/signup', {
                    Name,
                    Email,
                    Age,
                    Mobile,
                    Password
                }).then(res => {
                    if (res.data.message === 'Check mail') history(`/doctor/verify/${res.data.string}`)
                    else setErrorMsg(res.data)
                })
                :
                await axios.post(import.meta.env.VITE_BASE_URL + 'signup', {
                    Name,
                    Email,
                    Age,
                    Mobile,
                    Password
                }).then(res => {
                    if (res.data.message === 'Check mail') history(`/verify/${res.data.string}`)
                    else setErrorMsg(res.data)
                })
        }
    }


    return (
        <section className="logForm m-5 ">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 text-center  col-lg-6 col-xl-5">
                        <h1>SIGNUP</h1>
                        <img src="/derek-finch-bD1bK7IUvd8-unsplash.jpg"
                            className="img-fluid logimg mb-3" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            {errorMsg ?
                                <div className="alert alert-danger" role="alert">
                                    {errorMsg}
                                </div> : ''
                            }
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Name</label>
                                <input type="text" id="form3Example3" value={Name} onChange={(e) => setUserName(e.target.value)} className="form-control form-control-lg"
                                    placeholder="Name..." required />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input type="email" id="form3Example3" value={Email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg"
                                    placeholder="Email address..." required />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Age</label>
                                <input type="number" id="form3Example3" max={120} min={1} value={Age} onChange={(e) => setAge(e.target.value)} className="form-control form-control-lg"
                                    placeholder="Age..." required />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Mobile</label>
                                <input type="tel" id="form3Example3" value={Mobile} onChange={(e) => setMobile(e.target.value)} className="form-control form-control-lg"
                                    placeholder="Mobile..." required />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                <input type="password" id="form3Example4" value={Password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg"
                                    placeholder="Enter password..." required />
                            </div>
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                                <input type="password" id="form3Example4" value={cPassword} onChange={(e) => setCPassword(e.target.value)} className="form-control form-control-lg"
                                    placeholder="Confirm" required />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-success btn-lg"
                                    style={{ "paddingLeft": " 2.5rem", "paddingRight": "2.5rem" }} onClick={handleSubmit}>Signup</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0"> Already have an account? <span className='text-primary'> <Link to={'/login'}>Login</Link> </span> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup