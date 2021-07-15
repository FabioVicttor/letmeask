import { useContext } from "react";
import { AuthContext } from "../contexts/AtuhContext";

export function useAuth(){
    const value = useContext(AuthContext);

    return value;
}