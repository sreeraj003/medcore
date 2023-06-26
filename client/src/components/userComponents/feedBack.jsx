import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

function FeedBack() {

  const navigate = useNavigate()

  const handleHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <>
      <div className="text-center">

        <h1>Thank you</h1>
        <p>
          Hope you had a good session with the doctor and we are here for your future assistance.
        </p>
        <button className="btn btn-success" onClick={handleHome}>Home</button>
      </div>
    </>
  )
}

export default FeedBack