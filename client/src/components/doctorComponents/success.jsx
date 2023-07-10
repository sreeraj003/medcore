import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

function Success() {
  const navigate = useNavigate()

  const handleHome = useCallback(() => {
    navigate('/doctor/')
  }, [navigate])

  const handlePrescription = useCallback(() => {
    navigate('/doctor/consult')
  }, [navigate])

  return (
    <>
      <div className='text-center mt-5'>
        <h1>You have completed the consultation</h1>
        <button className="btn btn-success" onClick={handleHome}>Home</button>
        <button className="btn btn-success ms-2" onClick={handlePrescription}>Write Prescription</button>
      </div>
    </>
  )
}

export default Success