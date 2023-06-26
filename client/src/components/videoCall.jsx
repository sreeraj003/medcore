import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../context/socket/socketProvider'
import ReactPlayer from 'react-player'
import peer from './service/peer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { BsFillTelephoneFill, BsFillTelephoneXFill, BsMicFill, BsMicMuteFill } from 'react-icons/bs'
import PropTypes from 'prop-types'

VideoCall.propTypes = {
  value: PropTypes.string
}

function VideoCall({ value }) {

  const navigate = useNavigate()
  const socket = useSocket()
  const remoteRef = useRef()
  const [remoteSocketId, setRemoteSocketId] = useState()
  const docToken = localStorage.getItem('doctorToken')
  const [myStream, setMyStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState()
  const [callActive, setCallActive] = useState(false)
  const appoint = useSelector(state => state.consult.slot)
  const [muted, setMuted] = useState(true)
  const [accepted, setAccepted] = useState(false)

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined`);
    setRemoteSocketId(id)
  }, [])



  const handleCallUser = useCallback(async () => {
    if (callActive) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
      socket.emit('call:end', { to: remoteSocketId })
      setCallActive(false)
      setRemoteStream('')
      if (appoint) {
        await axios.patch(import.meta.env.VITE_BASE_URL + `doctor/endAppointment/${appoint}`, {
          headers: {
            Authorization: `Bearer ${docToken}`
          }
        }).then(res => {
          console.log(res.data);
        })
      }
      socket.emit('socket:disconnect', { socketId: remoteSocketId });
      if (value == 'doctor') {
        navigate('/doctor/success')
      } else if (value == "user") {
        navigate('/feedback')
      }

    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      const offer = await peer.getOffer()
      socket.emit('user:call', { to: remoteSocketId, offer })
      setMyStream(stream)
      setCallActive(true)
    }
  }, [appoint, callActive, docToken, myStream, navigate, remoteSocketId, socket, value])

  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketId(from)
    setCallActive(true)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    setMyStream(stream)
    const ans = await peer.getAnswer(offer)
    socket.emit('call:accepted', { to: from, ans })
  }, [socket])

  const sendStreams = useCallback(() => {
    setAccepted(true)
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    setCallActive(true)
  }, [myStream]);



  const handleCallAccepted = useCallback(
    async ({ ans }) => {
      await peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      setCallActive(true)
      sendStreams()
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer()
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
  }, [remoteSocketId, socket])

  const handleNegoIncoming = useCallback(async ({ from, offer }) => {
    const ans = await peer.getAnswer(offer)

    socket.emit('peer:nego:done', { to: from, ans })
  }, [socket])


  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans)
  }, [])

  const handleMute = useCallback(() => {
    setMuted(!muted)
  }, [muted])

  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
    }
  }, [handleNegoNeeded])


  useEffect(() => {
    peer.peer.addEventListener('track', async ev => {
      const remoteStream = ev.streams
      setRemoteStream(remoteStream[0])
    })
  }, [])

  useEffect(() => {
    socket.on('user:joined', handleUserJoined)
    socket.on('incoming:call', handleIncomingCall)
    socket.on('call:accepted', handleCallAccepted)
    socket.on('peer:nego:needed', handleNegoIncoming)
    socket.on('peer:nego:final', handleNegoFinal)



    return () => {
      socket.off('user:joined', handleUserJoined)
      socket.off('incoming:call', handleIncomingCall)
      socket.off('call:accepted', handleCallAccepted)
      socket.off('peer:nego:needed', handleNegoIncoming)
      socket.off('peer:nego:final', handleNegoFinal)

    }
  }, [socket, handleUserJoined, handleIncomingCall, handleNegoFinal, handleNegoIncoming, handleCallAccepted])

  return (
    <>
      <div className="text-center p-2">
        <h3><b>CONSULTING STATION</b></h3>
        {
          value == 'user' ? (!remoteSocketId && 'Please wait till the call arrives') : (
            !callActive && <h5>{remoteSocketId ? 'Patient online' : 'No one in room'}</h5>)
        }
        <div className="container">

          <div className="row text-start">
            <div className="col-md-6">
              {
                myStream &&
                <h1>My stream</h1>}
              {

                myStream && <ReactPlayer style={{ backgroundColor: 'black' }} url={myStream} playing muted width={'80%'} height={'80%'} />
              }
            </div>
            <div className="col-md-6">
              {remoteStream &&
                <h1>Remote stream</h1>
              }
              {

                remoteStream && <ReactPlayer style={{ backgroundColor: 'black' }} ref={remoteRef} url={remoteStream} playing muted={muted} width={'80%'} height={'80%'} />
              }

            </div>
          </div>

          <br />
          {callActive && <button className='btn bg-danger text-white' onClick={handleCallUser}><BsFillTelephoneXFill /></button>}
          {
            myStream && <>
              <button className={!muted ? 'btn btn-primary ms-3' : 'btn btn-dark ms-3'} onClick={handleMute}>{muted ? <BsMicMuteFill /> : <BsMicFill />}</button>
            </>
          }


          {value == 'user' && myStream && <><button className={accepted ? 'd-none' : 'btn btn-success ms-3'} onClick={sendStreams}><BsFillTelephoneFill /></button></>}
          {
            !callActive ? (value === 'doctor' && (remoteSocketId && <button className='btn btn-outline-success' onClick={handleCallUser}>Call</button>)) : ''
          }
        </div>
      </div>
    </>
  )
}

export default VideoCall