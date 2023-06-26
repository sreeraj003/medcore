import { useContext } from "react";
import { AuthContext } from "../authContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
