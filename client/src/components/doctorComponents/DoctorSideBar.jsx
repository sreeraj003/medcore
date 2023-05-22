/* eslint-disable react/prop-types */
import { FaStethoscope } from 'react-icons/fa';
import { BiNotepad } from 'react-icons/bi';
import './doctor.css'
import { IoIosPeople } from 'react-icons/io';
import { MdPerson, MdOutlineSick,MdCalendarMonth } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function DoctorSideBar({value}) {
    
    

    console.log(value);

    const history = useNavigate()

    const handleDashboard = ()=>{
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

    const handlePayments = () =>{
        history('/doctor/schedule')
    }

    const handleAdmins = () =>{
        history('/doctor/admins')
      }

    return (
        <>
            <div className='bg-black z-10 docSide top-0 left-0' style={{ left: '0%', top: '10%' }}>
                <div className='sidebar  bg-white fixed top-0 right-0 h-100 z-10 '>
                    <h2 className=' p-4 text-dark'>
                        Wellcome<br /><span className='text-success'><h1>{value.name}</h1></span>
                    </h2>
                    <nav >
                        <div className='flex flex-col  text-dark ps-5 text-start'>
                            <div className='text-xl py-4 flex' onClick={handleDashboard}  ><MdPerson size={25} className='mr-4' /> Dashboard</div>
                            <div className='text-xl py-4 flex' onClick={handleDoctor}><FaStethoscope size={25} className='mr-4' /> Appointments</div>
                            <div className='text-xl py-4 flex' onClick={handlePatient}><MdOutlineSick    size={25} className='mr-4' /> Patients</div>
                            <div className='text-xl py-4 flex' onClick={handleDepartment}><BiNotepad size={25} className='mr-4' /> Prescriptions</div>
                            <div className='text-xl py-4 flex' onClick={handlePayments}><MdCalendarMonth size={25} className='mr-4' /> My Schedule</div>
                            <div className='text-xl py-4 flex' onClick={handleAdmins}><IoIosPeople size={25} className='mr-4' /> Admins</div>                            
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default DoctorSideBar;
