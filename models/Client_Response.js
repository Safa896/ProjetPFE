const Sequelize = require('sequelize')
const db = require('../database/db.js')

var response = db.sequelize.define(
  'client_response',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_enquete:{
      type: Sequelize.STRING
    },

    client_id: {
      type: Sequelize.STRING
    },
    question_id: {
      type: Sequelize.STRING
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