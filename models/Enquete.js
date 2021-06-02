const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "enquete",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: Sequelize.STRING,
      required: true,
    },
    etat: {
      type: Sequelize.STRING,
      required: true,
    },
    nbr_questions: {
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
