import { useState } from 'react'
import Profile from '../../profile'
import './lists.css'
import Prescriptions from '../../prescriptions'
import UserAppointments from '../../userAppointments/userAppointments'

function ProfilePageStructure() {
    const [profile, setProfile] = useState(true)
    const [appointments, setAppointments] = useState(false)
    const [prescriptions, setPrescriptions] = useState(false)


    const profileHandle = () => {

        setProfile(true)
        setAppointments(false)
        setPrescriptions(false)
    }

    const appointHandle = () => {
        setProfile(false)
        setAppointments(true)
        setPrescriptions(false)
    }

    const prescriptHandle = () => {
        setProfile(false)
        setAppointments(false)
        setPrescriptions(true)
    }

    return (

        <div className="row">
            <div className="col-12 col-md-3">
                <div className="row text-center">
                    <div className="list-group p-4  mt-5" >
                        <div className="list-group-item btn btn-outline-success lists list-group-item-action text-wrap text-break" onClick={profileHandle}>Profile</div>
                        <div className="list-group-item btn btn-outline-success lists list-group-item-action text-wrap text-break" onClick={appointHandle}>Appointments</div>
                        <div className="list-group-item btn btn-outline-success lists list-group-item-action text-wrap text-break" onClick={prescriptHandle}>Prescriptions</div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-9 bg-light">
                {profile && <Profile />}
                {appointments && <UserAppointments />}
                {prescriptions && <Prescriptions />}
            </div>
        </div>

    )
}

export default ProfilePageStructure