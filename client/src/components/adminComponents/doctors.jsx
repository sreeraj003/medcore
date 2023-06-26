import DataTables from "../dataTables"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import View from "./view"
function Doctors() {
  const [selectedDoc, setSelectedDoc] = useState('')
  const [doctorsList, setDoctorsList] = useState([])
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const adminToken = localStorage.getItem('adminToken')



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
    setFilteredData(filtered);
  };

  const approved = useCallback(() => {
    setFilteredData(doctorsList.filter(el => el.isApproved == 'approved'))
  }, [doctorsList])

  const pending = useCallback(() => {
    setFilteredData(doctorsList.filter(el => el.isApproved == ''))
  }, [doctorsList])

  const rejected = useCallback(() => {
    setFilteredData(doctorsList.filter(el => el.isApproved == 'rejected'))
  }, [doctorsList])

  const all = () => {
    setFilteredData(doctorsList)
  }

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
    doctorData()
  }, [adminToken])

  return (
    <>

      {
        selectedDoc ? <View user={selectedDoc} setSelected={setSelectedDoc} value="doc" /> :
          (
            <>
              <h3>Doctors</h3>
              <div className="d-flex">
                <div className="form-check ms-3" >
                  <input className="form-check-input" onChange={approved} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Approved
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input className="form-check-input" onChange={pending} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Pending
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input className="form-check-input" onChange={rejected} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Rejected
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input className="form-check-input" onChange={all} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    All
                  </label>
                </div>
              </div>
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