import axios from "axios"
import { baseURL } from "../Constantes/DefaultValue"

export const createQuestion=(newQuestion)=>{
  console.log(newQuestion)
  
   return axios.post(baseURL+'questions/create', {
     
        entitled: newQuestion.entitled,
        type: newQuestion.type,
        theme: newQuestion.theme,
        statut: newQuestion.statut,
        creator: newQuestion.creator,
        
      })
      
  
}

export const createClient=(newClient)=>{
  console.log(newClient)
   return axios.post(baseURL+'client/create', {
        nom: newClient.nom,
        prenom: newClient.prenom,
        age: newClient.age,
       
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
