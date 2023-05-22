import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa'
import { MdPerson, MdSick } from 'react-icons/md'
import { BiBuildings } from 'react-icons/bi';
import './sidebar.css'
import { useNavigate } from 'react-router-dom';
import { BsCashCoin } from 'react-icons/bs';
const Sidebar = () => {
  const [nav, setNav] = useState(false)
  const history = useNavigate()

  const handleDashboard = ()=>{
    setNav(!nav)
    history('/admin/')
  }
  
  const handleDoctor = () => {
    setNav(!nav)
    history('/admin/doctors')
  }
  
  const handlePatient = () => {
    setNav(!nav)
    history('/admin/patients')
  }
  
  const handleDepartment = () => {
    setNav(!nav)
    history('/admin/departments')
  }
  
  const handlePayments = () =>{
    setNav(!nav)
      history('/admin/payments')
  }
  return (
    <div className='fixed bg-white top-0 navbar flex justify-between items-center p-4 text-white z-10'>

      {!nav ?
        <div className=' sm:flex items-center  ham bg-dark ms-0 mt-0 text-[18px]'>
          <div onClick={() => setNav(!nav)} className='cursor-pointer '>
            <AiOutlineMenu size={30} />
          </div>
        </div>


        : <div className='bg-grey  ham  z-10  left-0' style={{ position: "fixed", left: '0%', top: '10%' }}>
          <div className='sidebar text-center bg-white fixed top-0 right-0 w-[100%]  text-dark  z-10 duration-300' style={{ width: '100vw' }}>
            <AiOutlineClose onClick={() => setNav(!nav)} size={30} className='absolute  top-4 cursor-pointer' style={{ marginLeft: '83vw' }} />
            <h2 className='text-2xl p-4'>
              Admin
            </h2>
            <nav >
              <div className='flex flex-col  text-dark'>
                <div className='text-xl py-4 flex' onClick={handleDashboard}  ><MdPerson size={25} className='mr-4' /> Dashboard</div>
                <div className='text-xl py-4 flex' onClick={handleDoctor}><FaStethoscope size={25} className='mr-4' /> Doctors</div>
                <div className='text-xl py-4 flex' onClick={handlePatient}><MdSick size={25} className='mr-4' /> Patients</div>
                <div className='text-xl py-4 flex' onClick={handleDepartment}><BiBuildings size={25} className='mr-4' /> Department</div>
                <div className='text-xl py-4 flex' onClick={handlePayments}><BsCashCoin size={25} className='mr-4' /> Payments</div>
              </div>
            </nav>
          </div>
        </div>}
    </div>
  );
};

export default Sidebar;