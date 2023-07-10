import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import RequireDoctor from '../context/auth/requireDoctor'
import Signup from "../components/Signup"
import Navbar from '../components/navbar'
import Otp from '../components/otp'
import Login from '../components/Login'
import SetProfile from '../components/doctorComponents/setProfile'
import DocMain from '../components/doctorComponents/docMain'
import ForgotPassword from '../components/forgotPassword'
import ResetPassword from '../components/resetPassword'
import axios from 'axios'

const Success = lazy(() => import("../components/doctorComponents/success"))
const VideoCall = lazy(() => import('../components/videoCall'))

function Doctor() {
  axios.interceptors.request.use(
    (config) => {
      const doctorToken = localStorage.getItem('doctorToken');
      if (doctorToken) {
        config.headers['Authorization'] = `Bearer ${doctorToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <>
      <Navbar value='doctor' />
      <Routes>
        <Route path='/signup' element={<Signup value={'doctor'} />} />
        <Route path='/verify/:token' element={<Otp value={'doctor'} />} />
        <Route path='/login' element={<Login value={'doctor'} />} />
        <Route path='/forgotPassword' element={<ForgotPassword value={'doctor'} />} />
        <Route path='/newPassword/:email' element={<ResetPassword value={'doctor'} />} />
        <Route element={<RequireDoctor />} >
          <Route path='/' element={<DocMain value={'home'} />} />
          <Route path='/setprofile' element={<SetProfile />} />
          <Route path='/schedule' element={<DocMain value={'schedule'} />} />
          <Route path='/appointments' element={<DocMain value={'appointments'} />} />
          <Route path='/consult' element={<DocMain value={'consult'} />} />
          <Route path='/payments' element={<DocMain value={'payments'} />} />
          <Route path='/success' element={<Success />} />
          <Route path='/call/:room' element={<VideoCall value="doctor" />} />
          <Route path='/prescriptions' element={<DocMain value="prescription" />} />
          <Route path='/createPrscription' element={<DocMain value="createPrescription" />} />
          <Route path='/patients' element={<DocMain value="patients" />} />
        </Route>
      </Routes>
    </>
  )
}

export default Doctor