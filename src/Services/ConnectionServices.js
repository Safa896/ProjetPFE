import axios from "axios"
import { baseURL } from "../Constantes/DefaultValue";

export const login=(email,password)=>{
return  axios.post(baseURL+"users/login", {
    email: email,
    password: password,
  })
 
}
export const register=(first_name,last_name,email,password)=>{
    return  axios.post(baseURL+"users/register", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      })
    }

    