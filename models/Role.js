const Sequelize = require("sequelize");
const db = require("../database/db.js");



var Role = db.sequelize.define(
  "role",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
{
  timestamps:false
},
);

module.exports = Role