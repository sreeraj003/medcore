import { FaCoins, FaIdCard } from 'react-icons/fa';
import './admin.css'
import { MdNoteAlt } from 'react-icons/md';
function AdminHome() {

  return (
    <>

      <div className="col-md-9 col-lg-9 m-0">
        <div className='row m-auto' >
          <div className="col-lg-4">

            <div className='dataButton m-4'><FaCoins /> Total Income</div>
          </div>
          <div className="col-lg-4">

            <div className='dataButton m-4'><FaIdCard /> Total Patients</div>
          </div>
          <div className="col-lg-4">
            <div className='dataButton m-4'><MdNoteAlt /> Total Appoints</div>

          </div>
        </div>
        <div className='m-auto bg-secondary w-50 text-center text-white' style={{ height: '25vh' }} >Chart</div>
      </div>

    </>
  )
}

export default AdminHome;
