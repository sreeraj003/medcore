import { useCallback, useEffect, useState } from "react"
import DataTables from "../dataTables"
import axios from "axios"

function Prescriptions() {

  const [filteredData, setFilteredData] = useState([]);

  const prescriptionData = useCallback(async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'doctor/prescriptions', {
      // headers: {
      //   Authorization: `Bearer ${doctorToken}`,
      // }
    }).then(res => {
      console.log(res.data);
      setFilteredData(res.data)
    })
  }, [])


  const columns = [
    {
      name: 'PatientId',
      selector: (row) => row._id
    },
    {
      name: 'Patient Name',
      selector: (row) => row.userData[0].userName
    },
    {
      name: 'Health Issues',
      selector: (row) => row.issues
    },
    {
      name: 'Date',
      selector: (row) => row.createdAt.split(' ')[0]
    },
    {
      name: 'Medicines',
      selector: (row) => (
        <>
          {row.medicines && Object.entries(row.medicines).map(([key, value]) => (
            <div key={key}>
              {key}: {value.split(' ')[0]}
            </div>
          ))}
        </>
      ),
    },
  ]

  useEffect(() => {
    prescriptionData()
  }, [prescriptionData])

  return (
    <>
      <div className="ms-1" style={{ zIndex: '0' }}>
        <h3>Prescriptions</h3>
        <DataTables columns={columns} title='Departments' data={filteredData} />
      </div>
    </>
  )
}

export default Prescriptions