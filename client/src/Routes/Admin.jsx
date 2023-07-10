
import { Routes, Route } from "react-router-dom"
import RequireAdmin from "../context/Auth/requireAdmin"
import Navbar from "../components/navbar"
import Login from "../components/Login"
import BasePage from "../components/adminComponents/basePage"
import axios from "axios"

function Admin() {
  axios.interceptors.request.use(
    (config) => {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        config.headers['Authorization'] = `Bearer ${adminToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <>
      <Navbar value='admin' />
      <Routes>
        <Route path="/login" element={<Login value={'admin'} />} />
        <Route element={<RequireAdmin />}>
          <Route path="/" element={<BasePage value={"Home"} user={"admin"} />} />
          <Route path="/doctors" element={<BasePage value={"doctors"} user={"admin"} />} />
          <Route path="/departments" element={<BasePage value={"departments"} user={"admin"} />} />
          <Route path="/patients" element={<BasePage value={"patients"} user={"admin"} />} />
          <Route path="/payments" element={<BasePage value={"payments"} user={"admin"} />} />
          <Route path="/medicines" element={<BasePage value={"medicines"} user={"admin"} />} />
        </Route>
        <Route path="/*" element={<Login value={'admin'} />} />
      </Routes>
    </>
  )
}


export default Admin