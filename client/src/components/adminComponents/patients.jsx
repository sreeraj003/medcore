import DataTables from "../dataTables"

import axios from "axios"
import { useEffect, useState } from "react"
import View from "./view"
function Patients() {
  const [selectedPatient, setSelectedPatient] = useState('')
  const [patientsList, setPatientsList] = useState('')

  const adminToken = localStorage.getItem('adminToken')

  const patinetsData = async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'admin/patients', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    }).then(res => setPatientsList(res.data))
  }

  const viewPatient = (row) => {
    const doc = patientsList.filter(el => el._id == row._id)
    setSelectedPatient(doc[0])
  }


  const columns = [
    {
      name: 'ID',
      selector: (row) => row._id
    },
    {
      name: 'name',
      selector: (row) => row.userName
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
      name: "Action",
      cell: row => <button className="btn btn-success" onClick={() => viewPatient(row)}>View</button>
    }
  ]


  useEffect(() => {
    patinetsData()
  }, [])

  return (
    <>
      {
        selectedPatient ? <View user={selectedPatient} setSelected={setSelectedPatient} value="patient" /> :
          <DataTables columns={columns} title='Patients' data={patientsList} />
      }

    </>
  )
}
export default Patients