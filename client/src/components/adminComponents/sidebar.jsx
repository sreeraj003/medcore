import { useCallback, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa'
import { MdPerson, MdSick } from 'react-icons/md'
import { BiBuildings } from 'react-icons/bi';
import './sidebar.css'
import { useNavigate } from 'react-router-dom';
import { BsCashCoin, BsFileMedical } from 'react-icons/bs';
const Sidebar = () => {
  const [nav, setNav] = useState(false)
  const history = useNavigate()

  const handleDashboard = useCallback(() => {
    setNav(!nav)
    history('/admin/')
  }, [history, nav])

  const handleDoctor = useCallback(() => {
    setNav(!nav)
    history('/admin/doctors')
  }, [history, nav])

  const handlePatient = useCallback(() => {
    setNav(!nav)
    history('/admin/patients')
  }, [history, nav])

  const handleDepartment = useCallback(() => {
    setNav(!nav)
    history('/admin/departments')
  }, [history, nav])

  const handlePayments = useCallback(() => {
    setNav(!nav)
    history('/admin/payments')
  }, [history, nav])

  const handleMedicines = useCallback(() => {
    setNav(!nav)
    history('/admin/medicines')
  }, [history, nav])
  return (
    <div className='fixed bg-white top-0 navbar flex justify-between items-center p-4 text-white z-10' style={{ zIndex: "10" }}>

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
                <div className='text-xl py-4 flex' onClick={handleDashboard}><button className='btn'><MdPerson size={25} className='mr-4' /> Dashboardkk</button></div>
                <div className='text-xl py-4 flex' onClick={handleDoctor}><button className='btn'><FaStethoscope size={25} className='mr-4' /> Doctors</button></div>
                <div className='text-xl py-4 flex' onClick={handlePatient}><button className='btn'><MdSick size={25} className='mr-4' /> Patients</button></div>
                <div className='text-xl py-4 flex' onClick={handleDepartment}><button className='btn'><BiBuildings size={25} className='mr-4' /> Department</button></div>
                <div className='text-xl py-4 flex' onClick={handlePayments}><button className='btn'><BsCashCoin size={25} className='mr-4' /> Payments</button></div>
                <div className='text-xl py-4 flex' onClick={handleMedicines}><button className='btn'><BsFileMedical size={25} className='mr-4' /> Medicines</button></div>
              </div>
            </nav>
          </div>
        </div>}
    </div>
  );
};

export default Sidebar;