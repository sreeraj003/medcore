import { Routes, Route } from 'react-router-dom'
import RequireDoctor from '../context/auth/requireDoctor'
import Signup from "../components/Signup"
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import Otp from '../components/otp'
import Login from '../components/Login'
import SetProfile from '../components/doctorComponents/setProfile'
import DoctorHome from '../components/doctorComponents/doctorHome'
import { useSelector } from 'react-redux';

// const lazy(()=>)

function Doctor() {
  const doctor = useSelector(state => state.doctor.data)

  return (
    <>
      <Navbar value='doctor' />
      <Routes>
        <Route path='/signup' element={<Signup value={'doctor'} />} />
        <Route path='/verify/:token' element={<Otp value={'doctor'} />} />
        <Route path='/login' element={<Login value={'doctor'} />} />4
        <Route element={<RequireDoctor />} >
          <Route path='/' element={<DoctorHome value={doctor} />} />
          <Route path='/setprofile' element={<SetProfile />} />
        </Route>
      </Routes>
    </>
  )
}

export default Doctor