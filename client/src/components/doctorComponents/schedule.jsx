import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSchedule } from '../../redux/doctorSchedule'
import './schedule.css'
function Schedule() {

  const timeSlots = ['8.00 AM', '8.30 AM', '9.00 AM', '9.30 AM', '10.00 AM', '10.30 AM', "11.00 AM", "11.30 AM", "12.00 PM", '12.30 PM', '1.00 PM', '1.30 PM', '2.00 PM', '2.30 PM', '3.00 PM', '3.30 PM', '4.00 PM', '4.30 PM', '5.00 PM', '5.30 PM', '6.00 PM', '6.30 PM', '7.00 PM', '7.30 PM', '8.00 PM', '8.30 PM', '9.00 PM', '9.30 PM', '10.00 PM']
  const days = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [freeDate, setFreeDate] = useState('')
  const [freeTime, setFreeTime] = useState([])
  const [msg, setMsg] = useState('')

  const scheduleList = useSelector(state => state.docSchedule.schedule)
  console.log(scheduleList);

  const dispatch = useDispatch()
  const doctorToken = localStorage.getItem('doctorToken')



  useEffect(() => {
    const dataCall = async () => {
      await axios.get(import.meta.env.VITE_BASE_URL + 'doctor/schedule', {
        headers: {
          Authorization: `Bearer ${doctorToken}`
        }
      })
        .then(res => {
          dispatch(setSchedule(res.data))
        })
    }
    dataCall()
  }, [dispatch, doctorToken])


  const handleSchedule = async (e) => {
    e.preventDefault()
    if (!freeDate || !freeTime) {
      setMsg('Please fill date and time')
      setTimeout(() => {
        setMsg('')
      }, 3000)
      return
    }
    await axios.post(import.meta.env.VITE_BASE_URL + 'doctor/setSchedule', { date: freeDate, time: freeTime, action: e.target.value }, {
      headers: {
        Authorization: `Bearer ${doctorToken}`,
      }
    }).then(res => {
      if (res.data == 'error') {
        setMsg("Something went wrong")
      } else {
        setMsg('Slot added successfully')
        dispatch(setSchedule(res.data))
        setTimeout(() => {
          setMsg('')
        }, 3000)
        return
      }
    })
  }

  const removeSlot = async (e) => {
    e.preventDefault()
    const data = e.target.value.split('_')
    await axios.post(import.meta.env.VITE_BASE_URL + 'doctor/setSchedule', { date: data[0], time: data[1], action: 'remove' }, {
      headers: {
        Authorization: `Bearer ${doctorToken}`,
      }
    }).then(res => {
      if (res.data == 'error') {
        setMsg("Something went wrong")
      } else {
        setMsg('Slot removed successfully')
        dispatch(setSchedule(res.data))
        setTimeout(() => {
          setMsg('')
        }, 3000)
        return
      }

    })
  }
  return (
    <>
      <div className='container pb-2 ms-auto bg-white'>
        <h2>My Schedule</h2>
        <div className='bg-white text-center '>
          {msg == 'Please fill date and time' || msg == 'error' ?
            <div className='alert alert-danger'>{msg}</div>
            : !msg ? '' : <div className='alert alert-success'>{msg}</div>

          }
          <div className='d-flex p-3' style={{ maxWidth: '100%', justifyContent: 'center' }} >
            <div className="row">
              <div className="col-md-6">
                <div className="dropdown">
                  <button className="btn dropd dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {freeDate ? freeDate : 'Day'}
                  </button>
                  <ul className="dropdown-menu">
                    {days && days.map((el, index) =>
                      <li key={index}><a className="dropdown-item" onClick={() => setFreeDate(el)} href="#">{el}</a></li>
                    )
                    }
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="dropdown">
                  <button type="button" className="btn dropd dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Slot
                  </button>
                  <ul className="dropdown-menu  dropdown-toggle-split">
                    {timeSlots.map((el) => (
                      <li key={el}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={el}
                            id={el}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFreeTime((prevFreeTime) => [...prevFreeTime, el]);
                              } else {
                                setFreeTime((prevFreeTime) =>
                                  prevFreeTime.filter((time) => time !== el)
                                );
                              }
                            }}
                          />
                          <label className="form-check-label" htmlFor={el}>
                            {el}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button className='btn bg-success text-white ms-auto' value={'add'} onClick={handleSchedule}>Add</button>
          <div>
            <div style={{ maxWidth: "200px" }}><span>Selected Time :</span> <br /> {freeTime.map(el => el + ',')}</div>
            {scheduleList ?
              scheduleList.map((el, index) => (
                <div key={index} className="card text-start m-3 p-3">
                  <div>
                    <b style={{ fontSize: '20px' }}>Date : </b>{el.date}
                  </div>
                  <div>
                    <h5>Time Slotes :</h5>{el.time.map(time => <div className='btn p-1 m-2 text-white dropd' key={time}>{time}<button className='btn mt-0 ms-1 text-danger' value={el.date + '_' + time} onClick={removeSlot}>X</button></div>)}
                    <br />
                  </div>
                </div>
              )) : ''
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Schedule