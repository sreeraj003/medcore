
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import DownloadButton from './download';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Presciption() {

  const history = useNavigate()
  const userData = useSelector(state => state.user.data)
  const [prescriptions, setPrescriptions] = useState([])
  const userToken = localStorage.getItem('userToken')

  const dataCall = useCallback(async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'prescriptions', {
      headers: {
        Authorization: `Brearer ${userToken}`
      }
    }).then(res => {
      if (res.data == 'blocked') {
        history('/login')
        localStorage.removeItem('userToken')
      } else {
        console.log(res.data);
        setPrescriptions(res.data)
      }
    })
  }, [history, userToken])


  useEffect(() => {
    dataCall()
  }, [dataCall])
  return (
    <div>
      <h1>Prescriptions</h1>
      {
        prescriptions.length != 0 && prescriptions.map((el, index) => {
          return (
            <>
              <div key={index} className="card p-3">
                <div className="row">

                  <div className="col-md-4">
                    <h4>{el.docData[0].name}</h4>
                    <h6>{el.date}</h6>
                    <h6>{el.time}</h6>
                  </div>
                  <div className="col-md-4">
                    {
                      el.medicines &&
                      Object.entries(el.medicines).map(([key, value]) => (
                        <div key={value.split(' ')[0]}>
                          <b>{key}</b>:{value}
                        </div>
                      ))
                    }
                  </div>
                  <div className="col-md-4">
                    {
                      el.medicines &&
                      <DownloadButton el={el} user={userData} />
                    }
                  </div>
                </div>
              </div>
            </>
          )
        })}

    </div>
  );
}

export default Presciption
