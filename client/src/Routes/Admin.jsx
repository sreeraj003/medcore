import { Routes,Route } from "react-router-dom"
import RequireAdmin from "../context/Auth/requireAdmin"
import Navbar from "../components/Navbar"
import Login from "../components/Login"
import AdminHome from "../components/adminComponents/adminHome"
import Doctors from "../components/adminComponents/doctors"
import Footer from "../components/footer"
import Departments from "../components/adminComponents/departments"
import Patients from "../components/adminComponents/patients"
import Payments from "../components/adminComponents/payments"

function Admin() {
  return (
    <>
    <Navbar value='admin' />
    <Routes>
      <Route path="/login" element={<Login value={'admin'}/>}/>
      <Route element={<RequireAdmin />}>
        <Route path="/" element={<AdminHome/>} />
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/departments" element={<Departments/>}/>
        <Route path="/patients" element={<Patients/>}/>
        <Route path="/payments" element={<Payments/>}/>
      </Route>
      <Route path="/*" element={<Login value={'admin'}/>}/>
    </Routes>
    <Footer />
    </>
  )
}

export default Admin