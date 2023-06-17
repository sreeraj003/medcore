import DoctorSideBar from "./DoctorSideBar"
import Schedule from './schedule'
import DocAppointments from './docAppointments'
import Consult from './consult'
import Payments from './payments'
import PropTypes from 'prop-types'
import Prescription from "./prescription"
import CreatePrescription from "./createPrescription"
import Patients from "./patients"
import DoctorHome from "./doctorHome"

DocMain.propTypes = {
    value: PropTypes.string
}

function DocMain({ value }) {

    return (
        <>
            <div className='docCont'>
                <div className="row">
                    <div className="col-md-3 text-center bg-white side col-lg-3">
                        <DoctorSideBar />
                    </div>
                    <div className="col-md-9 p-5" >
                        <div style={{ width: '100%' }} >

                            {value == 'schedule' ?
                                <Schedule />
                                : value == "appointments" ?
                                    <DocAppointments />
                                    : value == 'consult' ?
                                        <Consult />
                                        : value == 'payments' ?
                                            <Payments />
                                            : value == 'prescription' ?
                                                <Prescription />
                                                : value == 'createPrescription' ?
                                                    <CreatePrescription />
                                                    : value == 'patients' ?
                                                        <Patients />
                                                        : value == 'home' ?
                                                            <DoctorHome />
                                                            : ''

                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocMain