import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import RequireUser from '../context/auth/requireUser'
import Login from '../components/Login'
import Signup from "../components/Signup"
import Otp from '../components/otp'
import Navbar from '../components/navbar'
import Home from '../components/userComponents/userHome'
import Loader from '../components/loader'
import VideoCall from '../components/videoCall'
import FeedBack from '../components/userComponents/feedBack'

const Payment = lazy(() => import('../components/userComponents/payment'))
const Appointment = lazy(() => import("../components/userComponents/appointment"))
const PageStructure = lazy(() => import('../components/userComponents/pages/docSearchPageStructure'))
const ProfilePageStructure = lazy(() => import('../components/userComponents/pages/userProfilePageStructure'))
const Success = lazy(() => import('../components/userComponents/success'))


function User() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify/:token' element={<Otp />} />
          <Route path='/login' element={<Login />} />
          <Route element={<RequireUser />}>
            <Route path='/' element={<Home />} />
            <Route path='/findDoctor' element={<PageStructure />} />
            <Route path='/profile' element={<ProfilePageStructure />} />
            <Route path='/appointments' element={<Appointment />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/success' element={<Success/>} />
            <Route path='/feedBack' element={<FeedBack />} />
            <Route path='/call/:room' element={<VideoCall value='user'/>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default User