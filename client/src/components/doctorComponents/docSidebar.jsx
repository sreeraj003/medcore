import { useState } from 'react';
import { FaStethoscope } from 'react-icons/fa';
import { BiNotepad, BiRupee } from 'react-icons/bi';
import './docSidebar.css'
import { MdPerson, MdOutlineSick, MdCalendarMonth } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';


const DocSidebar = () => {

  const doctor = useSelector(state => state.doctor.data)
  const [nav, setNav] = useState(false)
  const history = useNavigate()

  const handleDashboard = () => {
    setNav(!nav)
    history('/doctor/')
  }

  const handleAppointments = () => {
    setNav(!nav)
    history('/doctor/appointments')
  }

  const handlePatient = () => {
    setNav(!nav)
    history('/doctor/patients')
  }

  const handlePrescriptions = () => {
    setNav(!nav)
    history('/doctor/prescriptions')
  }

  const handleSchedule = () => {
    setNav(!nav)
    history('/doctor/schedule')
  }

  const handleAdmins = () => {
    setNav(!nav)
    history('/doctor/admins')
  }
  return (
    <div className='fixed bg-white top-0 navbar flex justify-between items-center p-4 text-white' style={{ zIndex: 10 }}>

      {!nav ?
        <div className=' sm:flex items-center  docham bg-dark ms-0 mt-0 text-[18px]'>
          <div onClick={() => setNav(!nav)} className='cursor-pointer '>
            <AiOutlineMenu size={30} />
          </div>
        </div>


        : <div className='bg-grey  docham  z-10  left-0' style={{ position: "fixed", left: '0%', top: '10%' }}>
          <div className='sidebar text-center bg-white fixed top-0 right-0 w-[100%]  text-dark  z-10 duration-300' style={{ width: '100vw' }}>
            <AiOutlineClose onClick={() => setNav(!nav)} size={30} className='absolute  top-4 cursor-pointer' style={{ marginLeft: '83vw' }} />
            <h2 className='text-2xl p-4'>
              Wellcome<br /><span className='text-success'><h1>{doctor.name}</h1></span>
            </h2>
            <nav >
              <div className='flex flex-col  text-dark'>
                <div className='text-xl sideItem py-4 flex' onClick={handleDashboard}  ><MdPerson size={25} className='mr-4' /> Dashboard</div>
                <div className='text-xl sideItem py-4 flex' onClick={handleAppointments}><FaStethoscope size={25} className='mr-4' /> Appointments</div>
                <div className='text-xl sideItem py-4 flex' onClick={handlePatient}><MdOutlineSick size={25} className='mr-4' /> Patients</div>
                <div className='text-xl sideItem py-4 flex' onClick={handlePrescriptions}><BiNotepad size={25} className='mr-4' /> Prescriptions</div>
                <div className='text-xl sideItem py-4 flex' onClick={handleSchedule}><MdCalendarMonth size={25} className='mr-4' /> My Schedule</div>
                <div className='text-xl sideItem py-4 flex' onClick={handleAdmins}><BiRupee size={25} className='mr-4' /> Admins</div>
              </div>
            </nav>
          </div>
        </div>}
    </div>
  );
};

export default DocSidebar;