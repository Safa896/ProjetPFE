const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Role= require("../models/Role");
const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  try {
    const today = new Date();
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role:req.body.role,
      created: today,
    };

    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash;
            User.create(userData)
              .then((async(data) => {
                let user = data.dataValues;
                const token = jwt.sign({ user }, "secretkey");
                res.status(200).send({
                  code: "REGISTRED",
                  message: token,
                  data:data
                });
              }))
              .catch((err) => {
                res.send("error: " + err);
              });
          });
        } else {
          res.send({ error: user.email + " User already exist" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  } catch (err) {
    console.log(err.message);
  }
});
users.post('/rol', (req, res) => {
   User.findOne({
     include: [{
     model: Role,
   }],
   where: {
     userIdUser: req.body.id,
 }
 })
 .then(users => {
   res.send(users)
 });
 
 })
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
users.post("/login", async (req, res) => {
  let userData = req.body;
  console.log(userData);
  User.findOne({
    where: {
      email: userData.email,
      password: userData.password,
    },
  }).then(async (data) => {
    if (data == null) {
      res.status(400).send({
        code: "INVALID_USER",
        message: "Password incorrect ! ",
      });
    } else {
      let user = data.dataValues;
      const token = jwt.sign({ user }, "secretkey");

      res.status(200).send({
        code: "SUCCESS",
        message: token,
        data:data
      });
    }
  });
});

module.exports = users;
