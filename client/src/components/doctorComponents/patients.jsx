import { useCallback, useEffect, useState } from "react"
import DataTables from "../dataTables"
import axios from "axios";

function Patients() {

    const [patientsData, setPatientsData] = useState()
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const prescriptionData = useCallback(async () => {
        await axios.get(import.meta.env.VITE_BASE_URL + 'doctor/patients', {
            // headers: {
            //     Authorization: `Bearer ${doctorToken}`,
            // }
        }).then(res => {
            console.log(res.data);
            setPatientsData(res.data)
            setFilteredData(res.data)
        })
    }, [])

    const columns = [

        {
            name: 'Patient Name',
            selector: (row) => row.userData[0].userName
        },
        {
            name: 'Contact',
            selector: (row) => row.userData[0].contact
        },
        {
            name: 'Email',
            selector: (row) => row.userData[0].email
        },
        {
            name: 'Age',
            selector: (row) => row.userData[0].age
        },
        {
            name: 'Gender',
            selector: (row) => row.userData[0].gender
        }
    ]
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);

        const filtered = patientsData.filter((patient) =>
            patient.userData[0].userName.toLowerCase().startsWith(searchValue)
        );
        setFilteredData(filtered);
    };

    useEffect(() => {
        prescriptionData()
    }, [prescriptionData])
    return (
        <>
            <div className="ms-1" style={{ zIndex: '0' }}>
                <h3>Patients</h3>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="form-control w-25 mb-2"
                />
                <DataTables columns={columns} title='Departments' data={filteredData} />
            </div>
        </>
    )
}

export default Patients