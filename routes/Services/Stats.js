const express = require("express");
const Stats = express.Router();
const cors = require("cors");
const multer = require("multer");
const Question = require("../../models/Question");
const response = require("../../models/Response");


Stats.get('/:theme',async(req,res)=>{
    let object=[]
const theme=req.params.theme
const question = await Question.findAll({
          where: {
            theme:theme,
            
          }
        });
        if (question) {
 object=[
    ...object,
   { numberOfQuestions:question.length}
] 
 var object2 = question.map(async (ques,i)=>{
 
return response.findAll({
        where:{
            questionId:ques.id
        }
    
    }).then((response)=>{
   
    return response.length
      })
    })
    Promise.all(object2).then(function(results) {
      object=[
          ...object,
          results
      ]
    }).then(()=>{
        res.status(200).send({
            data:object
            });
    })
      
    
        
    
    }
    
       
})

module.exports = Stats;