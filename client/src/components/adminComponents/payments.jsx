import { useCallback, useEffect, useState } from "react"
import axios from 'axios'
import DataTables from "../dataTables"
function Payments() {

  const doctorToken = localStorage.getItem('doctorToken')
  const [payments, setPayments] = useState()
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    async function dataCall() {
      await axios.get(import.meta.env.VITE_BASE_URL + 'admin/payments', {
        headers: {
          Authorization: `Bearer ${doctorToken}`
        }
      }).then(res => {
        setPayments(res.data)
        setFilteredData(res.data)
      })
    }
    dataCall()
  }, [doctorToken])

  const handleSearch = useCallback((e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = payments.filter((pay) =>
      pay.docData[0].name.toLowerCase().startsWith(searchValue)
    );
    console.log(filtered);
    setFilteredData(filtered);
  }, [payments])

  const columns = [
    {
      name: 'Id',
      selector: (row) => row._id
    },
    {
      name: 'Patient',
      selector: (row) => row.userData[0].userName
    },
    {
      name: 'Doctor',
      selector: (row) => row.docData[0].name
    },
    {
      name: 'Amount',
      selector: (row) => row.amount
    },
    {
      name: 'Date',
      selector: (row) => row.date
    },
  ]

  return (
    <>
      <div>Payments</div>
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

export default Payments