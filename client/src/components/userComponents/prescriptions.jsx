
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import DownloadButton from './download';
import {useSelector} from 'react-redux'

function Presciption() {

  const userData = useSelector(state=>state.user.data)
  const [prescriptions, setPrescriptions] = useState([])
  const userToken = localStorage.getItem('userToken')

  const dataCall = useCallback(async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'prescriptions', {
      headers: {
        Authorization: `Brearer ${userToken}`
      }
    }).then(res => {
      console.log(res.data);
      setPrescriptions(res.data)
    })
  }, [userToken])


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

                  <div className="col-md-6">
                    <h4>{el.docData[0].name}</h4>
                    <h6>{el.date}</h6>
                    <h6>{el.time}</h6>
                  </div>
                  <div className="col-md-6">
                    <DownloadButton el={el} user={userData} />
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
