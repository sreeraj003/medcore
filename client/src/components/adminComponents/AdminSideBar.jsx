import { FaStethoscope } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
import './admin.css'
import { MdPerson, MdOutlineSick } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
function AdminSideBar() {
    
    const history = useNavigate()

    const handleDashboard = ()=>{
        history('/admin/')
    }

    const handleDoctor = () => {
        history('/admin/doctors')
    }

    const handlePatient = () => {
        history('/admin/patients')
    }

    const handleDepartment = () => {
        history('/admin/departments')
    }

    const handlePayments = () =>{
        history('/admin/payments')
    }

    return (
        <>
            <div className='bg-black z-10 top-0 left-0' style={{ left: '0%', top: '10%' }}>
                <div className='sidebar adminSide bg-white fixed top-0 right-0 h-100 z-10 '>
                    <h2 className=' p-4 text-dark'>
                        Admin
                    </h2>
                    <nav >
                        <div className='flex flex-col  text-dark'>
                            <div className='text-xl py-4 flex' onClick={handleDashboard}  ><MdPerson size={25} className='mr-4' /> Dashboard</div>
                            <div className='text-xl py-4 flex' onClick={handleDoctor}><FaStethoscope size={25} className='mr-4' /> Doctors</div>
                            <div className='text-xl py-4 flex' onClick={handlePatient}><MdOutlineSick size={25} className='mr-4' /> Patients</div>
                            <div className='text-xl py-4 flex' onClick={handleDepartment}><BiBuildings size={25} className='mr-4' /> Department</div>
                            <div className='text-xl py-4 flex' onClick={handlePayments}><BsCashCoin size={25} className='mr-4' /> Payments</div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default AdminSideBar;
