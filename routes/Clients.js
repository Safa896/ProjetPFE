const express = require("express");
const Clients = express.Router();
const cors = require("cors");
const Client = require("../models/Client");


Clients.use(cors());
//POST
Clients.post("/create", (req, res) => {
  const today = new Date();
  const newClient = new Client({
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    created: today,
 
  });
  newClient
    .save()
    .then(async (data) => {
      res.status(200).send({
        code: "Client created successfully!!",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = Clients;