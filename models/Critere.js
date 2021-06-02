const Sequelize = require("sequelize");
const db = require("../database/db.js");
var Critere = db.sequelize.define(
  "critere",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  nom: {
      type: Sequelize.BOOLEAN,
    },
    prenom:{
        type: Sequelize.BOOLEAN,
    },
    age:{
        type: Sequelize.BOOLEAN,
    },
    telephone:{
        type: Sequelize.BOOLEAN,
    },
    created: {
        type: Sequelize.DATE,
      },
  },
  {
    freezeTableName: true,
  }
  ,
{
  timestamps:false
},
);
module.exports =Critere
