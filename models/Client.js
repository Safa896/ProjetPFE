const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "client",
  {
    id_client: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    created: {
      type: Sequelize.DATE,
    },
  },

  {
    freezeTableName: true,
  },
  {
    timestamps: false,
  }
);
