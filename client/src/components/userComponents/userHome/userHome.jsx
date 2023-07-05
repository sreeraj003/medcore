import axios from 'axios';
import './userHome.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [departments, setDepartments] = useState('')
  const history = useNavigate()

  useEffect(() => {
    async function dataCall() {
      await axios.get(import.meta.env.VITE_BASE_URL + 'departments')
        .then(res => {
          setDepartments(res.data)
        }
        )
    }
    dataCall()
  }, [])


  return (
    <>
      <div className='banner relative '>
        <img className='banner-image' src="/marcelo-leal-k7ll1hpdhFA-unsplash.jpg" alt="" />
        <div className='hero-text'>
          <p className='text-bold font-bold top-3/4 left-20'>RELAX <br />FIND YOUR DOCTOR</p>
          <button className='border-2 btn-success btn find left-20 px-2 py-1' onClick={() => history('/findDoctor')}>Find doctor</button>
        </div>
      </div>
      <div className="container card mt-5 mb-5 p-4">
        <h3>Departments Available</h3>
        <p>You can select the department you need to checkout.</p>
        <div className="row">
          {departments && departments.map(dep => (
            <div className="col-md-3 text-center  col-sm-4 col-6 h-25" key={dep._id}>
              <div className='card mt-3  mb-3' >
                <img className=' depImage ' src={dep.image} alt="" />
                <h4 className='mt-0 '>{dep.name}</h4>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 card p-4">
            <h6>We provide you the best services</h6>
            <p>We consider your entire wellness and we are intended to provide you the best doctors and services.</p>
            <div className="card docCardImg">
              <p className='m-5 par' ><b>Qualified and experienced doctors are available for each department. Book a slot for online consult.</b></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;