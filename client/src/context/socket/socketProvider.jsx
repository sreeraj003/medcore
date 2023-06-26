/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo } from 'react'
const SocketContext = createContext(null)
import { io } from 'socket.io-client'

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}

export const SocketProvider = (props) => {

    const socket = useMemo(() => io('localhost:8080'), [])
    return (
        <SocketContext.Provider value={socket} >
            {props.children}
        </SocketContext.Provider>
    )
}