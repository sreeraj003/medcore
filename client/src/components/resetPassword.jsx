import { useRef, useState } from "react"
import { validatePassword } from "./validator"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from "prop-types"

ResetPassword.propTypes = {
    value: PropTypes.string
}

function ResetPassword({ value }) {

    const { email } = useParams()
    const passref = useRef()
    const confirmRef = useRef()
    const errRef = useRef()
    const [errorMsg, setErrorMsg] = useState()
    const history = useNavigate()
    const [success, setSuccess] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const pass = passref.current.value
        const confirm = confirmRef.current.value
        if (!pass || !confirm) {
            setErrorMsg('Please enter all field')
        } else if (pass != confirm) {
            setErrorMsg('Password did not match.Please re-enter both fields')
        } else if (!validatePassword(pass)) {
            setErrorMsg('The password should have symbol,alphabet,capital letter,number.Please enter valid password')
        } else {
            if (value == 'doctor') {
                await axios.patch(import.meta.env.VITE_BASE_URL + `doctor/resetPassword`, {
                    password: pass,
                    email: email
                }).then(res => {
                    if (res.data == 'success') {
                        setSuccess(true)
                        setErrorMsg('Password changed successfully.')
                        setTimeout(() => {
                            history('/doctor/login')
                        }, 2000)
                    }
                })
            } else {
                await axios.patch(import.meta.env.VITE_BASE_URL + `resetPassword`, {
                    password: pass,
                    email: email
                }).then(res => {
                    if (res.data == 'success') {
                        setSuccess(true)
                        setErrorMsg('Password changed successfully.')
                        setTimeout(() => {
                            history('/login')
                        }, 2000)
                    }
                })
            }
        }

    }

    return (
        <div className="container mt-5">
            <h1 className="text-center text-success mb-4">Forgot Password</h1>
            <form>
                <div className="form-group w-50 m-auto text-center" >
                    {errorMsg ?
                        <div className={!success ? "alert alert-danger" : "alert alert-success"} ref={errRef} role="alert">
                            {errorMsg}
                        </div> : ''
                    }
                    <input type="text" className="form-control mb-3" ref={passref} placeholder="New Password" />
                    <input type="text" className="form-control mb-3" ref={confirmRef} placeholder="confirm Password" />
                    <button type="submit" className="btn btn-success btn-block " onClick={(e) => handleSubmit(e)}>Submit</button>

                </div>
            </form>

        </div>
    )
}

export default ResetPassword