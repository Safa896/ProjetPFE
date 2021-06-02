const express = require("express");
const links = express.Router();
const cors = require("cors");
const Link = require("../models/Link");
const Enquete = require("../models/Enquete");
var uuid = require("node-uuid");
const Critere = require("../models/Critere");
const Question = require("../models/Question");
const response = require("../models/Response");
links.use(cors());
//POST
links.post("/create", (req, res) => {
  const today = new Date();
  const newLink = new Link({
    url: uuid.v1(),
    created: today,
    idEnquete : req.body.idEnquete
  });
  newLink
    .save()
    .then(async (data) => {
      res.status(200).send({
        code: "Link created successfully!!",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

links.get("/:url", async (req, res) => {
    const linkUrl = req.params.url;
    const link = await Link.findOne({
      where: {
      url:linkUrl
    
      }

    });
    if (link ) {
        const enquete = await Enquete.findByPk(link.idEnquete);
        const criteres = await Critere.findAll();
        const questions = await  Question.findAll({
          where:{
              enqueteId:link.idEnquete
          },
          include:[
              Enquete,
              response
          ]
      });
      res.status(200).send({
        data:link,
         enquete:enquete,
         critere:criteres,
         questions: questions
        });
    } else {
      res.status(404).send({ message: "link Not Found." });
    }
  });

module.exports =links