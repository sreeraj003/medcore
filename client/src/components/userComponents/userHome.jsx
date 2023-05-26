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
      <div className="container">
        <div className="row">
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;