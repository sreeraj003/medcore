import { useEffect, useState } from 'react'
import './appointments/appointment.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { displayRazorpay } from './razorpayConfig'
import axios from 'axios'
function Payment() {

    const history = useNavigate()

    const [err, setErr] = useState()

    const userToken = localStorage.getItem('userToken')
    const appData = useSelector(state => state.appointment.appointment)
    const amount = appData.fee + (appData.fee * 0.1)

    useEffect(() => {
        if (!appData || isNaN(appData.fee)) {
            history('/findDoctor')
        }
    })
    const handlePay = async () => {
        try {

            const payment = await displayRazorpay(amount, appData);
            if (payment == 'slot unavailable') {
                setErr(payment)
                setTimeout(()=>{
                    setErr('')},4000)
            } else {

                if (payment) {
                    console.log(appData);
                    await axios.post(import.meta.env.VITE_BASE_URL + `bookslot`, appData, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    }).then(res => {
                        if (res.data == 'success') {
                            history('/success')
                        } else if (res.data == 'blocked') {
                            history('/login')
                            localStorage.removeItem('userToken')
                        }
                    })
                } else {
                    console.log('payment error');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="slice m-3 mx-auto mt-5 mb-5 p-2 app-div" style={{ maxWidth: '1200px' }}>
                {err?<div className="alert alert-danger text-center">{err}</div>:''}
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <img width={'100%'} src="https://www.shebaonline.org/wp-content/uploads/2018/09/Featured-image-new-14.jpg" alt="" />
                    </div>
                    <div className="col-lg-6">

                        <div className="col-12 text-center">
                            <h4 className='text-dark'>Payment</h4>
                        </div>
                        <div className="row">
                            <div className="col-5 text-end">
                                Service : <br />
                                Date : <br />
                                Time : <br />
                                Cons. Fee : <br />
                                Platform fee: <br />
                                Total Payable:
                            </div>
                            <div className="col-6 text-start text-success">
                                Online Consulting <br />
                                {appData.date} <br />
                                {appData.time} <br />
                                {appData.fee} <br />
                                {appData.fee * 0.1} <br />
                                {amount}/-
                            </div>
                            <div className="col-12 mt-5 text-center">
                                <button className='btn text-dark btn-outline-success' onClick={handlePay}>Pay</button> <button onClick={() => history('/findDoctor')} className='btn text-dark btn-outline-success'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment