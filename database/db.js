const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;


module.exports = db;
const Question = require("../models/Question");
const Reponse = require("../models/Response");
const User= require("../models/User");

const Role= require("../models/Role");
const Enquete = require("../models/Enquete");
Reponse.belongsTo(Question);

Question.hasMany(Reponse);
Enquete.hasMany(Question);
Question.belongsTo(Enquete)
Role.belongsTo(User);
User.hasMany(Role);
ROLES = ["user", "admin"];
