import axios from "axios"
import { useEffect, useState } from "react"
import BarChart from "../chart"
import { BiRupee } from "react-icons/bi"
import { FaIdCard } from "react-icons/fa"

function DoctorHome() {

  const [income, setIncome] = useState('')
  const [patients, setPatients] = useState('')
  const doctorToken = localStorage.getItem('doctorToken')
  const [docAppoint, setDocAppoint] = useState([])

  useEffect(() => {
    async function dataCall() {
      await axios.get(import.meta.env.VITE_BASE_URL + 'doctor/dash', {
        headers: {
          Authorization: `Bearer ${doctorToken}`
        }
      }).then(res => {
        setDocAppoint(res.data)
        const inc = res.data.reduce((acc, occ) => {
          return acc = acc + occ.amount
        }, 0)
        setIncome(inc)
        setPatients(res.data.length)
      })
    }
    dataCall()
  }, [doctorToken])
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
        <BarChart appoints={docAppoint} />
      </div>

    </>
  )
}

export default DoctorHome