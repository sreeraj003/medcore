import { lazy,Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import RequireUser from '../context/auth/requireUser'
import Login from '../components/Login'
import Signup from "../components/Signup"
import Otp from '../components/otp'
import Navbar from '../components/navbar'
import Home from '../components/userComponents/userHome'
// import PageStructure from '../components/userComponents/pages/pageStructure'
import Loader from '../components/loader'

const PageStructure = lazy(()=>import ('../components/userComponents/pages/pageStructure'))


function User() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify/:token' element={<Otp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<RequireUser />}>
          <Route path='/' element={<Home />} />
          <Route path='/findDoctor' element={<PageStructure />}/>
        </Route>
      </Routes>
      </Suspense>
    </>
  )
}

export default User