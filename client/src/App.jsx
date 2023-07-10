
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import Doctor from './Routes/doctor';
import User from "./Routes/User"
import Admin from './Routes/Admin';
import useAuth from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setDoctorData } from './redux/doctorData';

import { setAdminData } from './redux/adminData';

function App() {

  const { setDoctor, setAdmin } = useAuth()
  const dispatch = useDispatch()


  useEffect(() => {

    datacall()
    async function datacall() {
      const doctorToken = localStorage.getItem('doctorToken')
      const adminToken = localStorage.getItem('adminToken')


      if (doctorToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${doctorToken}`;
        await axios.get(import.meta.env.VITE_BASE_URL + `doctor/doctorData`)
          .then(res => {
            if (res.data) {
              if (res.data !== 'unauthorized') {
                dispatch(setDoctorData(res.data))
              }
              setDoctor(true)
            }
          })
      } else {
        setDoctor(false)
      }
      if (adminToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        await axios.get(import.meta.env.VITE_BASE_URL + `admin/adminData`)
          .then(res => {
            if (res.data) {
              if (res.data !== 'unauthorized') {
                dispatch(setAdminData(res.data))
              }
              setAdmin(true)
            }
          })
      } else {
        setAdmin(false)
      }
    }
  }, [dispatch, setAdmin, setDoctor])

  return (
    <>
      <div style={{ minHeight: "95vh" }}>
        <Router>
          <Routes>
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/doctor/*' element={<Doctor />} />
            <Route path='/*' element={<User />} />
          </Routes>
        </Router>
      </div>
    </>

  )
}

export default App
