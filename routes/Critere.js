const express = require("express");
const critere = express.Router();
const cors = require("cors");
const Critere = require("../models/Critere");


critere.use(cors());
//POST
critere.post("/create", (req, res) => {
  const today = new Date();
  const newCritere = new Critere({
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    telephone: req.body.telephone,
    created: today,
  
  });
  newCritere
    .save()
    .then(async (data) => {
      res.status(200).send({
        code: "Critere created successfully!!",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

critere.get("/", async (req, res) => {
   
    const critere= await Critere.findAll();
    if (Critere ) {
        
      res.status(200).send({
        data:critere,
        
        });
    } else {
      res.status(404).send({ message: "Critere Not Found." });
    }
  });

module.exports =critere