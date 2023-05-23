/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();


function Context({ children }) {

  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [doctor, setDoctor] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  return (
    <AuthContext.Provider value={{ user, setUser, admin, setAdmin, doctor, setDoctor, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Context
