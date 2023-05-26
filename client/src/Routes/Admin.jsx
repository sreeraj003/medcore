
import { Routes, Route } from "react-router-dom"
import RequireAdmin from "../context/Auth/requireAdmin"
import Navbar from "../components/navbar"
import Login from "../components/Login"
import BasePage from "../components/adminComponents/basePage"



function Admin() {
  return (
    <>
      <Navbar value='admin' />
      <Routes>
        <Route path="/login" element={<Login value={'admin'} />} />
        <Route element={<RequireAdmin />}>
          <Route path="/" element={<BasePage value={"Home"} />} />
          <Route path="/doctors" element={<BasePage value={"doctors"} />} />
          <Route path="/departments" element={<BasePage value={"departments"} />} />
          <Route path="/patients" element={<BasePage value={"patients"} />} />
          <Route path="/payments" element={<BasePage value={"payments"} />} />
        </Route>
        <Route path="/*" element={<Login value={'admin'} />} />
      </Routes>
    </>
  )
}


export default Admin