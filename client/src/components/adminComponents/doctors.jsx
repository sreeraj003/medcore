import AdminSideBar from "./adminSideBar"
import DataTables from "../dataTables"

import axios from "axios"
import { useEffect, useState } from "react"
import ViewDoc from "./viewDoc"
function Doctors() {
  const [selectedDoc, setSelectedDoc] = useState('')
  const [doctorsList, setDoctorsList] = useState('')

  const adminToken = localStorage.getItem('adminToken')

  const doctorData = async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'admin/doctors', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    }).then(res => setDoctorsList(res.data))
  }

  const viewDoc = (row) => {
    const doc = doctorsList.filter(el => el._id == row._id)
    setSelectedDoc(doc[0])
  }


  const columns = [
    {
      name: 'ID',
      selector: (row) => row._id
    },
    {
      name: 'name',
      selector: (row) => row.name
    },
    {
      name: 'fee',
      selector: (row) => row.fee
    },
    {
      name: 'contact',
      selector: (row) => row.contact
    },
    {
      name: 'age',
      selector: (row) => row.age
    },
    {
      name: 'department',
      selector: (row) => row.department
    },
    {
      name: "Action",
      cell: row => <button className="btn btn-success" onClick={() => viewDoc(row)}>View</button>
    }
  ]


  useEffect(() => {
    doctorData()
  }, [])

  return (
    <>
      <div className='adminCont'>
        <div className="row">
          <div className="col-md-3 z-10 text-center bg-white side">
            <AdminSideBar />
          </div>
          <div className="col-md-9 ">
            <div className='row mt-4 me-2' >
              <div className="col-12 me-4">
                {
                  selectedDoc ? <ViewDoc doctor={selectedDoc} setSelectedDoc={setSelectedDoc} /> :
                    <DataTables columns={columns} data={doctorsList} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Doctors