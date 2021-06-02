const express = require("express");
const Enquetes = express.Router();
const cors = require("cors");
const Enquete = require("../models/Enquete");
const Question = require("../models/Question");

Enquetes.use(cors());
//POST
Enquetes.post("/create", (req, res) => {
  const today = new Date();
  const newEnquete = new Enquete({
    titre: req.body.titre,
    etat: req.body.etat,
    nbr_questions: req.body.nbr_questions,
    created: today,
    questions : JSON.stringify(req.body.questions)
  });
  newEnquete
    .save()
    .then(async (data) => {
      res.status(200).send({
        code: "Enquete created successfully!!",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
Enquetes.delete("/delete/:id", async (req, res) => {
  const deletedEnquete = await Enquete.destroy({
    where: {
     id:req.params.id
    },
  });
  if (deletedEnquete) {
    return res
      .status(200)
      .send({ message: "Enquetes deleted", data: deletedEnquete });
  }

return res.status(500).send({ message: " Error in deleting Enquete." });
});
Enquetes.get("/:id", async (req, res) => {
  const EnqueteId = req.params.id;
  const enquete = await Enquete.findByPk(EnqueteId);
  if (enquete) {
    res.status(200).send({
      data: enquete,
    });
  } else {
    res.status(404).send({ message: "Enquete Not Found." });
  }
});
//PUT
Enquetes.put("/update/:id", async (req, res) => {
  const EnqueteId = req.params.id;
  const enquete = await Enquete.findByPk(EnqueteId);
  if (enquete) {
    enquete.titre = req.body.titre;
    enquete.etat = req.body.etat;
    enquete.nbr_questions = req.body.nbr_questions;
    const updatedEnquete = await enquete.save();
    if (updatedEnquete) {
      return res
        .status(200)
        .send({ message: "Enquete Updated", data: updatedEnquete });
    }
  }
  return res.status(500).send({ message: " Error in Updating Enquete." });
});

module.exports = Enquetes;
