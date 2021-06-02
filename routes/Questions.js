const express = require("express");
const questions = express.Router();
const cors = require("cors");
const multer = require("multer");
const Question = require("../models/Question");
const Enquete = require("../models/Enquete");
const Response = require("../models/Response");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
questions.use(cors());
questions.post("/create", upload.single("questionImage"), (req, res) => {
  console.log(req.file);
  console.log(req.body.response)
  const today = new Date();
  const newQuestion = new Question({
    entitled: req.body.entitled,
    entitled_response: req.body.entitled_response,
    creator:req.body.creator,
    statut:req.body.statut,
    type: req.body.type,
    theme: req.body.theme,
    response: JSON.stringify(req.body.response),
    //questionImage:req.file.path,
    created: today,
  });
  newQuestion
    .save()
    .then((async(data) => {
      res.status(200).send({
        code: "Question created successfully!!",
        data:data
      });
    }))
    .catch((err) => res.status(400).json("Error: " + err));
});
questions.delete("/delete/:id", async (req, res) => {
  const deletedQuestion = await Question.destroy({
    where: {
     id:req.params.id
    },
  });
  if (deletedQuestion) {
    return res
      .status(200)
      .send({ message: "Question deleted", data: deletedQuestion});
  }

return res.status(500).send({ message: " Error in deleting Question." });
});
questions.get("/:id", async (req, res) => {
  const questionId = req.params.id;
  const question = await Question.findByPk(questionId);
  
  if (question) {
    res.status(200).send({
      data:question
      });
  } else {
    res.status(404).send({ message: "Question Not Found." });
  }
});
// GET BY ENQUETE 
questions.get("/getbyenquete/:id", async (req, res) => {
  Question.findAll({
      where:{
          enqueteId:req.params.id
      },
      include:[
          Enquete,
          Response
      ]
  })
  .then(response => res.send(response));
}); 
//GET BY THEME
questions.get("/getbytheme/:theme", async (req, res) => {
  const questionTheme = req.params.theme;
  const question = await Question.findAll({
    where: {
      theme:questionTheme,
      statut:"Actif"
    }
  });
  if (question) {
    res.status(200).send({
      data:question
      });
  } else {
    res.status(404).send({ message: "Question Not Found." });
  }
});

questions.put("/update/:id", async (req, res) => {
  const questionId = req.params.id;
  const question= await Question.findByPk(questionId);
  if (question) {
    question.entitled=req.body.entitled || question.entitled;
    question.entitled_response=req.body.entitled_response || question.entitled_response;
    question.creator=req.body.creator || question.creator;
    question.statut=req.body.statut || question.statut;
    question.type= req.body.type || question.type;
    question.theme= req.body.theme || question.theme;
    question.response= req.body.response || question.response;
    question.enqueteId= req.body.enqueteId || question.enqueteId;
    const updatedQuestion = await question.save();
    if (updatedQuestion) {
      return res.status(200).send({ message: 'Question Updated', data: updatedQuestion });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Question.' });

});


module.exports = questions;
