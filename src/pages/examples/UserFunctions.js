import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:5000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
    })
    .then((res) => {
      localStorage.setItem("usertoken", JSON.stringify(res.data));
      localStorage.setItem("User", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const create = (newQuestion) => {
  return axios
    .post("http://localhost:5000/questions/create", {
      entitled: newQuestion.entitled,
      entitled_response: newQuestion.entitled_response,
      type: newQuestion.type,
      theme: newQuestion.theme,
      statut: newQuestion.statut,
      creator: newQuestion.creator,
    })

    .then((res) => {
      const idQuestion = res.data.data["id"];
      console.log(idQuestion);
      const ResponseArray = newQuestion.responses;
      ResponseArray.map((response) => {
        axios
          .post("http://localhost:5000/responses/create", {
            reponse: response.reponse,
            questionId: idQuestion,
          })
          .then((res) => {
            console.log("well done");
          });
      });
    });
};

export const createEnquete = (newEnquete) => {
  console.log(newEnquete)
  return axios
    .post("http://localhost:5000/enquete/create", {
      titre: newEnquete.titre,
      nbr_questions: newEnquete.nbr_questions,
      etat: newEnquete.etat,
    })

    .then((res) => {
      const idEnquete = res.data.data["id"];
      // console.log(idQuestion);
      const QuestionArray = newEnquete.questions;
      if(QuestionArray){
      QuestionArray.map((question) => {
        axios
          .put(`http://localhost:5000/questions/update/${question.id}`, {
            enqueteId: idEnquete,
          })
          .then((res) => {
            console.log("well done");
          });
      });
    }
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5000/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("usertoken", JSON.stringify(res.data));
      localStorage.setItem("User", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
