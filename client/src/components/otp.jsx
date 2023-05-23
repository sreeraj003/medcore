import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import './otp.css'

Otp.propTypes = {
  value: PropTypes.string
}

function Otp({ value }) {
  const { token } = useParams()
  const history = useNavigate()
  const [otp, setOtp] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (parseInt(otp) < 1000 || parseInt(otp) > 9999 || !parseInt(otp)) {
      setErrorMsg('Invalid otp')
    }
    value === 'doctor' ?
      await axios.post(import.meta.env.VITE_BASE_URL + `doctor/verify/${token}`, {
        otp: parseInt(otp)
      }).then((res) => {
        if (res.data == "verified") history('/doctor/login')
        else { setErrorMsg('Invalid otp') }
      })
      :
      await axios.post(import.meta.env.VITE_BASE_URL + `verify/${token}`, {
        otp: parseInt(otp)
      }).then((res) => {
        if (res.data == "verified") history('/login')
        else { setErrorMsg('Invalid otp') }
      })
  }

  return (

    <div className="otp mt-5">
      <p>An otp have been sent to your mail.Please check the mail.</p>
      <form action="" className='form' style={{ 'width': '100px' }}>
        <label htmlFor="otp">Enter otp</label>
        {errorMsg ?
          <div className=" mt-1 alert alert-danger text-10" role="alert">
            {errorMsg}
          </div> : ''
        }
        <input type="number" value={otp} max={9999} min={1000} onChange={(e) => setOtp(e.target.value)} className='form-control ' />
        <br />
        <button className='btn btn-success' onClick={handleSubmit}>Verify</button>
      </form>
    </div>
  )
}

export default Otp