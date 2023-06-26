import { useEffect } from 'react'
import { TiTick } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
function Success() {

    const history = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            history('/')
        }, 3000)

        return (
            clearTimeout()
        )
    })

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="text-center" style={{ width: "100%", height: "200px" }}>
                <TiTick style={{ color: "green", width: "100%", height: "100%" }} />
                <h4>Successfully Registered Your Appointment. <br /> Please check the schedule.
                    Please Be On Time. <br />
                    Thank You.</h4>
            </div>
        </div>


    )
}

export default Success