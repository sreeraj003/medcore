/* eslint-disable react/prop-types */
import { FaStethoscope } from 'react-icons/fa';
import { BiNotepad, BiRupee } from 'react-icons/bi';
import './doctor.css'
import { MdPerson, MdOutlineSick, MdCalendarMonth } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DoctorSideBar() {
    const value = useSelector(state => state.doctor.data)
    const history = useNavigate()

    const handleDashboard = () => {
        history('/doctor/')
    }

    const handleDoctor = () => {
        history('/doctor/appointments')
    }

    const handlePatient = () => {
        history('/doctor/patients')
    }

    const handleDepartment = () => {
        history('/doctor/prescriptions')
    }

    const handlePayments = () => {
        history('/doctor/schedule')
    }

    const handleAdmins = () => {
        history('/doctor/payments')
    }

    return (
        <>
            <div className='bg-black z-10 docSide top-0 left-0' style={{ zIndex: 10, left: '0%', top: '10%' }}>
                <div className='sidebar  bg-white fixed top-0 right-0 h-100 z-10 '>
                    <h2 className=' p-4 text-dark'>
                        Wellcome<br /><span className='text-success'><h1>{value.name}</h1></span>
                    </h2>
                    <nav >
                        <div className='flex flex-col  text-dark ps-5 text-start'>
                            <div className='text-xl py-4 flex' onClick={handleDashboard}  ><MdPerson size={25} className='mr-4' /> Dashboard</div>
                            <div className='text-xl py-4 flex' onClick={handleDoctor}><FaStethoscope size={25} className='mr-4' /> Appointments</div>
                            <div className='text-xl py-4 flex' onClick={handlePatient}><MdOutlineSick size={25} className='mr-4' /> Patients</div>
                            <div className='text-xl py-4 flex' onClick={handleDepartment}><BiNotepad size={25} className='mr-4' /> Prescriptions</div>
                            <div className='text-xl py-4 flex' onClick={handlePayments}><MdCalendarMonth size={25} className='mr-4' /> My Schedule</div>
                            <div className='text-xl py-4 flex' onClick={handleAdmins}><BiRupee size={25} className='mr-4' /> Payments</div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default DoctorSideBar;
