import { useEffect, useState } from 'react'
import DataTables from '../dataTables'
import axios from 'axios';

function Payments() {
  const [payments, setPayments] = useState('')

  const getPayments = async () => {
    // const doctorToken = localStorage.getItem('doctorToken');
    const res = await axios.get(import.meta.env.VITE_BASE_URL + 'doctor/payments', {
      // headers: {
      //   Authorization: `Bearer ${doctorToken}`
      // }
    });
    setPayments(res.data);
  };

  const columns = [
    {
      name: 'Patient',
      selector: (row) => row.userData[0].userName
    },

    {
      name: 'Date',
      selector: (row) => <div>{row.createdAt && row.createdAt.split(' ')[0]}</div>
    },
    {
      name: 'Amount',
      selector: (row) => row.amount
    }
  ];

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <h3>Payments</h3>

      <DataTables
        columns={columns}
        title="Appointments"
        data={payments}
      />
    </>)
}

export default Payments