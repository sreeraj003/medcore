import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import RequireAdmin from "../context/Auth/requireAdmin"
import Navbar from "../components/navbar"
import Login from "../components/Login"
import AdminHome from "../components/adminComponents/adminHome"
import Loader from "../components/loader"

const Doctors = lazy(() => wait(1000).then(() => import("../components/adminComponents/doctors")));
const Departments = lazy(() => wait(1000).then(() => import("../components/adminComponents/departments")));
const Patients = lazy(() => wait(1000).then(() => import("../components/adminComponents/patients")));
const Payments = lazy(() => wait(1000).then(() => import("../components/adminComponents/payments")))

function Admin() {
  return (
    <>
      <Navbar value='admin' />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login value={'admin'} />} />
          <Route element={<RequireAdmin />}>
            <Route path="/" element={<AdminHome />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/payments" element={<Payments />} />
          </Route>
          <Route path="/*" element={<Login value={'admin'} />} />
        </Routes>
      </Suspense>

    </>
  )
}

const wait = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export default Admin