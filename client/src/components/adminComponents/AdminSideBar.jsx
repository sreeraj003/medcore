import { FaStethoscope } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
import './admin.css'
import { MdPerson, MdOutlineSick } from 'react-icons/md';
import { BsCashCoin,BsFileMedical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
function AdminSideBar() {

    const history = useNavigate()

    const handleDashboard = useCallback(() => {
        history('/admin/')
    }, [history])

    const handleDoctor = useCallback(() => {
        history('/admin/doctors')
    }, [history])

    const handlePatient = useCallback(() => {
        history('/admin/patients')
    }, [history])

    const handleDepartment = useCallback(() => {
        history('/admin/departments')
    }, [history])

    const handlePayments = useCallback(() => {
        history('/admin/payments')
    }, [history])

    const handleMedicines = useCallback(() => {
        history('/admin/medicines')
    }, [history])

    return (
        <>
            <div className='bg-black z-10 top-0 left-0' style={{ left: '0%', top: '10%' }}>
                <div className='sidebar adminSide bg-white fixed top-0 right-0 h-100 z-10 '>
                    <h2 className=' p-4 text-dark'>
                        Admin
                    </h2>
                    <nav >
                        <div className='flex flex-col  text-dark'>
                            <div className='text-xl buttons py-4 flex' onClick={handleDashboard}  ><button className='btn'><MdPerson size={25} className='mr-4' /> Dashboard</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handleDoctor}><button className='btn'><FaStethoscope size={25} className='mr-4' /> Doctors</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handlePatient}><button className='btn'><MdOutlineSick size={25} className='mr-4' /> Patients</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handleDepartment}><button className='btn'><BiBuildings size={25} className='mr-4' /> Department</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handlePayments}><button className='btn'><BsCashCoin size={25} className='mr-4' /> Payments</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handleMedicines}><button className='btn'><BsFileMedical size={25} className='mr-4' /> Medicines</button></div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default AdminSideBar;
