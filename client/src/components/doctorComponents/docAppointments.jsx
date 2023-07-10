import { useEffect, useState } from 'react';
import DataTables from '../dataTables';
import axios from 'axios';

function DocAppointments() {
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const doctorToken = localStorage.getItem('doctorToken');



  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const filtered = appointments.filter((appointment) =>
      appointment.userData[0].userName.toLowerCase().startsWith(searchValue)
    );
    console.log(filtered);
    setFilteredData(filtered);
  };


  const columns = [
    {
      name: 'Time',
      selector: (row) => row.time,
      sortable: true
    },
    {
      name: 'Patient',
      selector: (row) => row.userData[0].userName
    },
    {
      name: 'Address',
      selector: (row) => row.userData[0].address
    },
    {
      name: 'Phone',
      selector: (row) => row.userData[0].contact
    },
    {
      name: 'Status',
      selector: (row) => (
        <div>
          {row.isAttended ? 'Attended' : new Date(row.createdAt) < new Date() ? 'Unavailable' : 'Pending'}
        </div>
      )
    }
  ];

  useEffect(() => {
    const getAppointments = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + 'doctor/appointments', {
        headers: {
          Authorization: `Bearer ${doctorToken}`
        }
      });
      setFilteredData(res.data)
      setAppointments(res.data);
    };
    getAppointments();
  }, [doctorToken]);

  return (
    <>
      <h3>Appointments</h3>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
        className="form-control w-25 mb-2"
      />
      <DataTables
        columns={columns}
        title="Appointments"
        data={filteredData}
      />
    </>
  );
}

export default DocAppointments;
