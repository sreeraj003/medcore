import { FaCoins, FaIdCard } from 'react-icons/fa';
import './admin.css'
import { MdNoteAlt } from 'react-icons/md';
import AdminSideBar from './adminSideBar';
function AdminHome() {

  return (
    <>
      <div className='adminCont'>
        <div className="row">
          <div className="col-md-3 text-center bg-white side col-lg-3">
            <AdminSideBar />
          </div>
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
            <div className='m-auto bg-secondary w-50 h-50 text-center text-white'>Chart</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome;
