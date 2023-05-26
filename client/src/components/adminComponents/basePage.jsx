import React, { lazy, Suspense } from 'react'
import Loader from '../loader';
import AdminSideBar from "./AdminSideBar"
import AdminHome from './adminHome';

const Doctors = lazy(() => wait(1000).then(() => import("../adminComponents/doctors")));
const Departments = lazy(() => wait(1000).then(() => import("../adminComponents/departments")));
const Patients = lazy(() => wait(1000).then(() => import("../adminComponents/patients")));
const Payments = lazy(() => wait(1000).then(() => import("../adminComponents/payments")))

function BasePage({ value }) {
    return (

        <div className='adminCont'>
            <div className="row">
                <div className="col-md-3 z-10 text-center bg-white side">
                    <AdminSideBar />
                </div>
                <div className="col-md-9 ">
                    <div className='row mt-4  ps-2 pe-3' >
                        <div className="col-12 m-1">
                            <Suspense fallback={<Loader />}>
                                {
                                    value == "doctors" ?
                                        <Doctors />
                                        :
                                        value == 'patients' ?
                                            <Patients />
                                            :
                                            value == "departments" ?
                                                <Departments />
                                                :
                                                value == 'payments' ?
                                                    <Payments />
                                                    :
                                                    value == "Home" ?
                                                        <AdminHome />
                                                        : ''

                                }
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const wait = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

export default BasePage