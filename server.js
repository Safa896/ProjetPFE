const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const pdf = require("html-pdf");
const pdfTemplate = require("./documents");

const app = express();
const port = process.env.PORT || 5000;
const db = require("./database/db");
var Users = require("./routes/Users");
var Clients = require("./routes/Clients");
const User = require("./models/User");
var Questions = require("./routes/Questions");
const Question = require("./models/Question");
const Response = require("./models/Response");
const Role = require("./models/Role");
var Responses = require("./routes/Reponse");
const Enquete = require("./routes/Enquete");
const Enquetes = require("./models/Enquete");
const Link = require("./routes/Links");
const critere = require("./routes/Critere");
const Stats = require("./routes/Services/Stats");
const client_reponse = require("./routes/Client_reponse");

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to our application." });
});
app.get("/questions", async (req, res) => {
  Question.findAll({
    include: [
      {
        model: Response,
      },
    ],
  })
    .then(async (data) => {
      res.status(200).send({
        succes: "true",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
app.get("/question_enquete", async (req, res) => {
  Question.findAll({
    include: [
      {
        model: Enquetes,
      },
    ],
  })
    .then(async (data) => {
      res.status(200).send({
        succes: "true",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
app.get("/responses", async (req, res) => {
  Response.findAll({
    include: [
      {
        model: Question,
      },
    ],
  })
    .then(async (data) => {
      res.status(200).send({
        succes: "true",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
app.get("/enquete", async (req, res) => {
  Enquetes.findAll({
    include: [
      {
        model: Question,
      },
    ],
  })
    .then(async (data) => {
      res.status(200).send({
        succes: "true",
        data: data,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
app.post("/questions/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get("/questions/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

 /* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial()
});  */
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
}
//GLOBAL ROUTES
app.use("/users", Users);
app.use("/questions", Questions);
app.use("/responses", Responses);
app.use("/enquete", Enquete);
app.use("/link", Link);
app.use("/critere", critere);
app.use("/stats", Stats);
app.use("/clientreponse", client_reponse);
app.use("/client", Clients);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
