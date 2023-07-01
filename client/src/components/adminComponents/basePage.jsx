import { lazy, Suspense } from 'react'
import Loader from '../loader';
import AdminSideBar from "./AdminSideBar"
import AdminHome from './adminHome';
import PropTypes from 'prop-types'
import Medicines from './medicines';

BasePage.propTypes = {
    value: PropTypes.string
}

const Doctors = lazy(() => import("../adminComponents/doctors"))
const Departments = lazy(() => import("../adminComponents/departments"))
const Patients = lazy(() => import("../adminComponents/patients"))
const Payments = lazy(() => import("../adminComponents/payments"))
function BasePage({ value }) {
    return (

        <div className='adminCont'>
            <div className="row">
                <div className="col-md-3 z-10 text-start ps-5 m- bg-white side">
                    <AdminSideBar />
                </div>
                <div className="col-md-9 p- ">
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
                                                        : value == 'medicines' ?
                                                            <Medicines />
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

export default BasePage