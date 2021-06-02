const Sequelize = require("sequelize");
const db = require("../database/db.js");
var Link = db.sequelize.define(
  "link",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: Sequelize.STRING,
    },
    idEnquete:{
        type: Sequelize.INTEGER,
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
module.exports =Link
