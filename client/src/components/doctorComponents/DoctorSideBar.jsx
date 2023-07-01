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
                            <div className='text-xl sideItem  py-4 flex' onClick={handleDashboard}  ><button className='btn buttons'><MdPerson size={25} className='mr-4' /> Dashboard</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDoctor}><button className='btn buttons'><FaStethoscope size={25} className='mr-4' /> Appointments</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handlePatient}><button className='btn buttons'><MdOutlineSick size={25} className='mr-4' /> Patients</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDepartment}><button className='btn buttons'><BiNotepad size={25} className='mr-4' /> Prescriptions</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handlePayments}><button className='btn buttons'><MdCalendarMonth size={25} className='mr-4' /> My Schedule</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleAdmins}><button className='btn buttons'><BiRupee size={25} className='mr-4' /> Payments</button></div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default DoctorSideBar;
