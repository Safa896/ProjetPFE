const Sequelize = require('sequelize')
const db = require('../database/db.js')

var response = db.sequelize.define(
  'response',
  {
    id_response: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reponse: {
      type: Sequelize.STRING
    },
   
  
  },
  
  
  {
    freezeTableName: true,
  }
  ,
  {
    timestamps: false
  }
)
module.exports =response