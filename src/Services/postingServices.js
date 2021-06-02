import axios from "axios"
import { baseURL } from "../Constantes/DefaultValue"

export const createQuestion=(newQuestion)=>{
  console.log(newQuestion)
   return axios.post(baseURL+'questions/create', {
        entitled: newQuestion.entitled,
        entitled_response: newQuestion.entitled_response,
        type: newQuestion.type,
        theme: newQuestion.theme,
        statut: newQuestion.statut,
        creator: newQuestion.creator,
        
      })
      
     
}
export const createEnquete = (newEnquete) => {
  
  return axios
    .post(baseURL + 'enquete/create', {
      titre: newEnquete.titre,
      nbr_questions: newEnquete.nbr_questions,
      etat: newEnquete.etat,
    })
};
export const AddQuesEnquete = (question,enqueteId) => {
  let q=question
  q.enqueteId=enqueteId
  console.log(q)
  return axios.put(baseURL + 'questions/update/'+question.id, q)
  
  
};
