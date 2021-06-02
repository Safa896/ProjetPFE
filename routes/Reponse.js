const express = require("express");
const responses = express.Router();
const cors = require("cors");
const Response = require("../models/Response");
const Question = require("../models/Question");
const response = require("../models/Response");
responses.use(cors());
responses.post("/create", (req, res) => {
  const newResponse = new Response({
    reponse: req.body.reponse,
    questionId: req.body.questionId,
  });
  newResponse
    .save()
    .then(async (data) => {
      res.status(200).send({
        code: "Response created successfully!!",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
responses.get("/:id", async (req, res) => {
    Response.findAll({
        where:{
            questionId:req.params.id
        },
        include:[
            Question
        ]
    })
    .then(response => res.send(response));
}); 
responses.delete("/delete/:id", async (req, res) => {
    const deletedResponse = await Response.destroy({
      where: {
       id_response:req.params.id
      },
    });
    if (deletedResponse) {
      return res
        .status(200)
        .send({ message: "Response deleted", data: deletedResponse });
    }

  return res.status(500).send({ message: " Error in deleting Response." });
});
responses.put("/update/:id", async (req, res) => {
  const questionId = req.params.id;
  const response = await Response.findByPk(questionId);
  if (response) {
    response.reponse = req.body.reponse;
    const updatedResponse = await response.save();
    if (updatedResponse) {
      return res
        .status(200)
        .send({ message: "Response Updated", data: updatedResponse });
    }
  }
  return res.status(500).send({ message: " Error in Updating Response." });
});

module.exports = responses;
