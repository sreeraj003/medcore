import DataTables from "../dataTables"

import axios from "axios"
import { useEffect, useState } from "react"
import View from "./view"
function Patients() {
  const [selectedPatient, setSelectedPatient] = useState('')
  const [patientsList, setPatientsList] = useState([])
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const adminToken = localStorage.getItem('adminToken')

  const viewPatient = (row) => {
    const doc = patientsList.filter(el => el._id == row._id)
    setSelectedPatient(doc[0])
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = patientsList.filter((patient) =>
      patient.userName.toLowerCase().startsWith(searchValue)
    );
    console.log(filtered);
    setFilteredData(filtered);
  };

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
    const patinetsData = async () => {
      await axios.get(import.meta.env.VITE_BASE_URL + 'admin/patients', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      }).then(res => {
        setPatientsList(res.data)
        setFilteredData(res.data)
      })
    }
    patinetsData()
  }, [adminToken])

  return (
    <>
      {
        selectedPatient ? <View user={selectedPatient} setSelected={setSelectedPatient} value="patient" /> :
          (
            <>
              <h3>Patients</h3>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search..."
                className="form-control w-25 mb-2"
              />
              <DataTables columns={columns} title='Patients' data={filteredData} />
            </>
          )
      }

    </>
  )
}
export default Patients