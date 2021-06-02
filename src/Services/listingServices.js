import axios from "axios"
import { baseURL } from "../Constantes/DefaultValue"

export  const getAllQuestions=()=>{
return axios.get(baseURL+"questions")
}
export  const getAllEnquete=()=>{
    return axios.get(baseURL+"enquete")
    }