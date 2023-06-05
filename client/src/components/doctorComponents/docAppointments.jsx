import React, { useEffect, useState } from 'react'
import DataTables from '../dataTables'
import axios from 'axios'

function DocAppointments() {

    const [appointments,setAppointments] = useState('')

   const doctorToken = localStorage.getItem('doctorToken')


   const appoints = async()=>{
    await axios.get(import.meta.env.VITE_BASE_URL+`doctor/appointments`,{
        headers:{
            Authorization:`Bearer ${doctorToken}`
        }
    }).then(res=>setAppointments(res.data))
   }

   const column = [
    {
        name:'Time',
        selector:(row)=>row.time
    },{
        name:'Date',
        selector:(row)=>row.date
    },{
        name:'Patient',
        selector:(row)=>row.userData[0].userName
    },{
        name:'Address',
        selector:(row)=>row.userData[0].address
    },{
        name:"Phone",
        selector:(row)=>row.userData[0].contact 
    },{
        name:'Status',
        selector:(row)=><div>{row.isAttended?'Attended':new Date(row.date)<new Date()?"Unavailable":"Pending"}</div>
    }
   ]
   
   
    useEffect(()=>{
        appoints()
    },[])

    return (
        <>
           <DataTables columns={column} title='Appointments' data={appointments}/>
        </>
    )
}

export default DocAppointments