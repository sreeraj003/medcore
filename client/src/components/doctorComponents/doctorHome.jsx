/* eslint-disable react/prop-types */
import DoctorSideBar from "./DoctorSideBar"

function DoctorHome({ value }) {
  return (
    <>
      <div className='docCont'>
        <div className="container  m-0 p-0">
          <div className="row">
            <div className="col-md-3 text-center bg-white side col-lg-3">
              <DoctorSideBar value={value} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorHome