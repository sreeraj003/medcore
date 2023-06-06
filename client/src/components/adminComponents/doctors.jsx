import DataTables from "../dataTables"
import axios from "axios"
import { useEffect, useState } from "react"
import View from "./view"
function Doctors() {
  const [selectedDoc, setSelectedDoc] = useState('')
  const [doctorsList, setDoctorsList] = useState([])
  const [search,setSearch] = useState('')
  const [filteredData,setFilteredData] = useState([])

  const adminToken = localStorage.getItem('adminToken')

  const doctorData = async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'admin/doctors', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    }).then(res => {
      setDoctorsList(res.data)
      setFilteredData(res.data)
    })
  }

  const viewDoc = (row) => {
    const doc = doctorsList.filter(el => el._id == row._id)
    setSelectedDoc(doc[0])
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
  
    const filtered = doctorsList.filter((doc) =>
      doc.name.toLowerCase().startsWith(searchValue)
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
      name: 'Name',
      selector: (row) => <div className="tip " data-bs-toggle="tooltip" title={row.name}> {row.name}</div>
    },
    {
      name: 'Fee',
      selector: (row) => row.fee && row.fee
    },
    {
      name: 'Contact',
      selector: (row) => row.contact
    },
    {
      name: 'Age',
      selector: (row) => row.age
    },
    {
      name: 'Department',
      selector: (row) => row.dept[0]?.name
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
          (
            <>
              <h3>Doctors</h3>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search..."
                className="form-control w-25 mb-2"
              />
              <DataTables columns={columns} title='Doctor' data={filteredData} />
            </>
          )
      }

    </>
  )
}

export default Doctors