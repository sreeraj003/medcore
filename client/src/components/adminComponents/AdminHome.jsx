import { FaIdCard } from 'react-icons/fa';
import './admin.css'
import { BiRupee } from 'react-icons/bi'
import { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from '../chart';

function AdminHome() {

  const [appointments, setAppointments] = useState([])
  const [income, setIncome] = useState('')
  const [patients, setPatients] = useState('')

  const adminToken = localStorage.getItem('adminToken')

  useEffect(() => {
    async function dataCall() {
      axios.get(import.meta.env.VITE_BASE_URL + 'admin/income', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      }).then(res => {
        setAppointments(res.data)
        const inc = res.data.reduce((acc, occ) => {
          return acc = acc + occ.amount
        }, 0)
        setIncome(inc)
        setPatients(res.data.length)
      })
    }
    dataCall()
  }, [adminToken])


  return (
    <>
      <div className="col-md-9 col-lg-9 m-0">
        <div className='row m-auto' >
          <div className="col-lg-6">
            <div className='dataButton m-4'>

              <h5> <BiRupee /> Total Income</h5>
              <h4> {income && income}</h4>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='dataButton m-4'>
              <h5><FaIdCard /> Total appointments</h5>
              <h4>{patients && patients}</h4>
            </div>
          </div>

        </div>
        <BarChart appoints={appointments} />
      </div>

    </>
  )
}

export default AdminHome;
