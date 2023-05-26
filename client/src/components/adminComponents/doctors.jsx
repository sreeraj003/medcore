import DataTables from "../dataTables"

import axios from "axios"
import { useEffect, useState } from "react"
import View from "./view"
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
      selector: (row) => row.dept[0].name
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
      {
        selectedDoc ? <View user={selectedDoc} setSelected={setSelectedDoc} value="doc" /> :
          <DataTables columns={columns} title='Doctor' data={doctorsList} />
      }

    </>
  )
}

export default Doctors