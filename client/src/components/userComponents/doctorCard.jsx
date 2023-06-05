import React from 'react';
import { useDispatch } from 'react-redux';
import { setDoc } from '../../redux/selectedDoc';
import { useNavigate } from 'react-router-dom';

function DoctorCard({ docData }) {

  const dispatch = useDispatch()
  const history = useNavigate()

  const handleCheck = (e) => {
    console.log(e);
    const data = e
    dispatch(setDoc(data))
    history('/appointments')
  }

  return (
    <>
      <div className="d-flex p-3 flex-wrap gap-3">
        {docData.length > 0 ? (
          docData.map((el, index) => (
            <div className="m-3 p-2 card" style={{ width: '13rem', minHeight: '20rem' }} key={index}>
              <div className='m-auto' style={{ width: '10rem', height: '10rem' }}>
                <img style={{ width: '10rem', height: '10rem' }} src={import.meta.env.VITE_BASE_URL + `images/${el.image}`} className="card-img-top" alt="..." />
              </div>
              <div className="card-body mb-0 ps-2" style={{ textAlign: "left", maxWidth: "13rem", left: 0 }}>
                <h5 className='text-dark'>{el.name}</h5>
                <p className='ms' style={{ fontSize: "13px", color: "black", opacity: "80%" }}>{el?.doctorData[0]?.name} <br />{el.qualification}</p>
              </div>
              <div className="row">
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <div>
                    stars
                  </div>
                  <div>
                    Rs.{el.fee}
                  </div>
                </div>
              </div>
              <button className='btn mt-0 btn-outline-success' onClick={() => handleCheck(el)}>Check</button>
            </div>
          ))
        ) : (
          <div className='ms-5'><b>Ooopsie...!</b> <br />
            No doctor found</div>
        )}
      </div>
    </>
  );
}

export default DoctorCard;
