import React from 'react'
import DoctorSideBar from "./DoctorSideBar"
import Schedule from './schedule'

function DocMain({value}) {

    return (
        <>
            <div className='docCont'>
                <div className="container  m-0 p-0">
                    <div className="row">
                        <div className="col-md-3 text-center bg-white side col-lg-3">
                            <DoctorSideBar />
                        </div>
                        <div className="col-md-9 p-5">
                            {value=='schedule'?<Schedule/>:''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocMain