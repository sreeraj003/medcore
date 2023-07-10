import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import RequireUser from '../context/auth/requireUser'
import Login from '../components/Login'
import Signup from "../components/Signup"
import Otp from '../components/otp'
import Navbar from '../components/navbar'
import Home from '../components/userComponents/userHome/userHome'
import Loader from '../components/loader'
import VideoCall from '../components/videoCall'
import FeedBack from '../components/userComponents/feedBack'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import useAuth from '../hooks/useAuth'

const Payment = lazy(() => import('../components/userComponents/payment'))
const Appointment = lazy(() => import("../components/userComponents/appointments/appointment"))
const PageStructure = lazy(() => import('../components/userComponents/pages/docSearchPageStructure'))
const ProfilePageStructure = lazy(() => import('../components/userComponents/pages/userProfile/userProfilePageStructure'))
const Success = lazy(() => import('../components/userComponents/success'))
import { setUserData } from '../redux/userData'
import ForgotPassword from '../components/forgotPassword'
import ResetPassword from '../components/resetPassword'

function User() {
  const dispatch = useDispatch()
  const { setUser } = useAuth()
  const userToken = localStorage.getItem('userToken')
  const history = useNavigate()

  axios.interceptors.request.use(
    (config) => {
      if (userToken) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    async function dataCall() {
      if (userToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        await axios.get(import.meta.env.VITE_BASE_URL + `userData`)
          .then(res => {
            if (res.data) {
              if (res.data !== 'unauthorized' || res.data !== 'blocked') {
                dispatch(setUserData(res.data))
                setUser(true)
              } else {
                history('/login')
              }
            }

          })
      } else {
        setUser(false)

      }
    }
    dataCall()
  }, [dispatch, history, setUser, userToken])
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify/:token' element={<Otp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/' element={<Home />} />
          <Route path='/newPassword/:email' element={<ResetPassword />} />4

          <Route element={<RequireUser />}>
            <Route path='/findDoctor' element={<PageStructure />} />
            <Route path='/profile' element={<ProfilePageStructure />} />
            <Route path='/appointments' element={<Appointment />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/success' element={<Success />} />
            <Route path='/feedBack' element={<FeedBack />} />
            <Route path='/call/:room' element={<VideoCall value='user' />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default User