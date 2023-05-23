import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import RequireUser from '../context/auth/requireUser'
import Login from '../components/Login'
import Signup from "../components/Signup"
import Otp from '../components/otp'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import Home from '../components/userComponents/userHome'


function User() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify/:token' element={<Otp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<RequireUser />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default User