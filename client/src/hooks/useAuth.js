import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
