const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "question",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entitled: {
      type: Sequelize.STRING,
      required: true,
    },
    /* entitled_response: {
      type: Sequelize.STRING,
      required: true,
    }, */
    creator: {
      type: Sequelize.STRING,
    },
    statut: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
      required: true,
    },
    theme: {
      type: Sequelize.STRING,
      required: true,
    },
    /*response: {
      type: Sequelize.STRING,
    },*/
    questionImage: {
      type: Sequelize.STRING,
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
