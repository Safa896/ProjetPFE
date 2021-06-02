const express = require("express");
const  client_reponse = express.Router();
const cors = require("cors");
const  clientReponse = require("../models/Client_Response");


 client_reponse.use(cors());
//POST
 client_reponse.post("/create", (req, res) => {
  const today = new Date();
  const newclientReponse = new clientReponse({
   id_enquete:req.body.id_enquete,
   client_id: req.body.client_id,
   question_id:req.body.question_id,
   reponse:req.body.reponse,
    created:today
      
  
  });
  newclientReponse
    .save()
    .then(async (data) => {
      res.status(200).send({
        code: " client_reponse created successfully!!",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

 client_reponse.get("/", async (req, res) => {
   
    const  Client_reponse= await  clientReponse.findAll();
    if ( Client_reponse ) {
        
      res.status(200).send({
        data: Client_reponse,
        
        });
    } else {
      res.status(404).send({ message: " client_reponse Not Found." });
    }
  });

module.exports = client_reponse