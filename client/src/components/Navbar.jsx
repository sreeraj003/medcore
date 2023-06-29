import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Sidebar from "./adminComponents/sidebar"
import DocSidebar from './doctorComponents/docSidebar';
import { IoIosContact } from 'react-icons/io';
import { BiNotepad } from 'react-icons/bi'
import useAuth from '../context/hooks/useAuth';
import { setUserData } from '../redux/userData';
import { setDoctorData } from '../redux/doctorData';
import { setAdminData } from '../redux/adminData';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'

Navbar.propTypes = {
    value: PropTypes.string
}

function Navbar({ value }) {

    const { setUser, setDoctor, setAdmin } = useAuth()

    const history = useNavigate()
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
                        <img className="medcore" onClick={() => {
                            value == 'doctor' ?
                                history('/doctor/')
                                : value == "admin" ?
                                    history('/admin/')
                                    :
                                    history('/')

                        }} src="/medcore.png" alt="" />
                    </div>
                </div>
                {
                    value === 'doctor' ? <>
                        <button className='btn btn-outline-success text-dark doc_nav' onClick={() => history('/doctor/prescriptions')} ><BiNotepad style={{ marginTop: '-7px' }} />Prescriptions</button>
                    </>
                        : ''
                }

                <div className='d-flex navMine'>
                    {
                        value === "doctor" ?
                            <button className="btn  doc btn-outline-success" onClick={() => history('/doctor/consult')}>Consult</button>
                            : value === 'admin' ?
                                <div></div>
                                :
                                <button className="btn doc btn-outline-success" onClick={() => history('/findDoctor')}>Doctors</button>
                    }

                    <div>{'   '}</div>

                    <div className="dropdown">
                        {
                            value === 'admin' ?
                                admin ?
                                    <Link onClick={handleLogout}> <button className='btn btn-outline-success'>Logout</button> </Link>
                                    : ''
                                :
                                <a className="btn me-0 ms-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <IoIosContact size={40} />
                                </a>
                        }

                        {
                            !value && user ?
                                <ul className="dropdown-menu right-0" style={{ marginLeft: '-90px', width: '100px', textAlign: 'center' }}>
                                    <li><Link className='link' to={'/profile'} >Profile</Link></li>
                                    <li><Link className='link' onClick={handleLogout}>Logout</Link></li>
                                </ul>
                                : value == 'doctor' && doctor ?
                                    <ul className="dropdown-menu right-0" style={{ marginLeft: '-90px', width: '100px', textAlign: 'center' }}>
                                        <li><Link className='link' to={'/doctor/setprofile'} >Profile</Link></li>
                                        <li><Link className='link' onClick={handleLogout}>Logout</Link></li>
                                    </ul>
                                    : value == 'admin' && admin ?
                                        <ul className="dropdown-menu right-0" style={{ marginLeft: '-90px', width: '100px', textAlign: 'center' }}>
                                            <li><Link className='link' to={'/admin/appointments'} >Appointments</Link></li>
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
