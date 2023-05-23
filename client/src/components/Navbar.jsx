import { Link } from 'react-router-dom';
import './Navbar.css';
import Sidebar from "./adminComponents/sidebar"
import DocSidebar from './doctorComponents/docSidebar';
import { IoIosContact } from 'react-icons/io';
import { FaCalendar } from 'react-icons/fa';
import { BiNotepad } from 'react-icons/bi'
import useAuth from '../context/hooks/useAuth';
import { setUserData } from '../redux/userData';
import { setDoctorData } from '../redux/doctorData';
import { setAdminData } from '../redux/adminData';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react/prop-types
function Navbar({ value }) {

    const { setUser, setDoctor, setAdmin } = useAuth()

    const dispatch = useDispatch()

    const handleLogout = () => {
        if (value === 'doctor') {
            localStorage.removeItem('doctorToken')
            dispatch(setDoctorData({}))
            setDoctor(false)
        } else if (value === 'admin') {
            localStorage.removeItem('adminToken')
            dispatch(setAdminData({}))
            setAdmin(false)
        } else {
            localStorage.removeItem('userToken')
            dispatch(setUserData({}))
            setUser(false)
        }
    }
    const { user, doctor, admin } = useAuth()
    return (
        <nav className="navbar navbar-light bg-white">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="navbar-brand">
                        <img className="medcore" src="/medcore.png" alt="" />
                    </div>
                </div>
                {
                    value === 'doctor' ? <>
                        <button className='btn btn-outline-success text-dark doc_nav'  ><FaCalendar style={{ marginTop: '-7px' }} />Make appointments</button>
                        <button className='btn btn-outline-success text-dark doc_nav' ><BiNotepad style={{ marginTop: '-7px' }} />Write prescription</button>
                    </>
                        : ''
                }
                <div className='d-flex navMine'>
                    {
                        value === "doctor" ?
                            <button className="btn  doc btn-outline-success ">Consult</button>
                            : value === 'admin' ?
                                <div></div>
                                :
                                <button className="btn doc btn-outline-success ">Find Doctor</button>
                    }
                    <div>{'   '}</div>
                    <div className="dropdown">
                        {
                            value === 'admin' ?
                                admin ?
                                    <Link onClick={handleLogout}> <button className='btn btn-outline-success'>Logout</button> </Link>
                                    : ''
                                :
                                <a className="btn me-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <IoIosContact size={40} />
                                </a>
                        }
                        {
                            !value && user ?
                                <ul className="dropdown-menu right-0" style={{ marginLeft: '-90px', width: '100px', textAlign: 'center' }}>
                                    <li><Link className='link' to={'/profile'} >Profile</Link></li>
                                    <li><Link className='link' to={'/appointments'} >Appointments</Link></li>
                                    <li><Link className='link' onClick={handleLogout}>Logout</Link></li>
                                </ul>
                                : value == 'doctor' && doctor ?
                                    <ul className="dropdown-menu right-0" style={{ marginLeft: '-90px', width: '100px', textAlign: 'center' }}>
                                        <li><Link className='link' to={'/profile'} >Profile</Link></li>
                                        <li><Link className='link' to={'/appointments'} >Appointments</Link></li>
                                        <li><Link className='link' onClick={handleLogout}>Logout</Link></li>
                                    </ul>
                                    : value == 'admin' && admin ?
                                        <ul className="dropdown-menu right-0" style={{ marginLeft: '-90px', width: '100px', textAlign: 'center' }}>
                                            <li><Link className='link' to={'/appointments'} >Appointments</Link></li>
                                            <li><Link className='link' onClick={handleLogout}>Logout</Link></li>
                                        </ul>
                                        :
                                        <ul className="dropdown-menu right-0" style={{ marginLeft: '-90px', textAlign: 'center' }}>
                                            <li>
                                                {
                                                    value === 'doctor' ?
                                                        <Link className='link' to={'/doctor/login'} >Login</Link>
                                                        : value === 'admin' ?
                                                            ''
                                                            :
                                                            <Link className='link' to={'/login'} >Login</Link>
                                                }
                                            </li>
                                        </ul>
                        }
                    </div>
                    {
                        value === 'admin' ?
                            <Sidebar />
                            : value == 'doctor' ?
                                <DocSidebar /> : '  '
                    }
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
