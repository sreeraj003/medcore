import { Routes, Route } from 'react-router-dom'
import RequireDoctor from '../context/auth/requireDoctor'
import Signup from "../components/Signup"
import Navbar from '../components/navbar'
import Otp from '../components/otp'
import Login from '../components/Login'
import SetProfile from '../components/doctorComponents/setProfile'
import DocMain from '../components/doctorComponents/docMain'
import Schedule from '../components/doctorComponents/schedule'

function Doctor() {
  return (
    <>
      <Navbar value='doctor' />
      <Routes>
        <Route path='/signup' element={<Signup value={'doctor'} />} />
        <Route path='/verify/:token' element={<Otp value={'doctor'} />} />
        <Route path='/login' element={<Login value={'doctor'} />} />4
        <Route element={<RequireDoctor />} >
          <Route path='/' element={<DocMain value={'home'}/>} />
          <Route path='/setprofile' element={<SetProfile />} />
          <Route path='/schedule' element={<DocMain value={'schedule'} />} />
        </Route>
      </Routes>
    </>
  )
}

export default Doctor