const express = require('express');
const app = express();
const quizRoute = express.Router();

// Results model
let Results = require('../models/Results');
let Candidate = require('../models/Candidate');
let UserAnswer = require('../models/UserAnswer');
array:any=[];


// Save the user scored results  Results
quizRoute.route('/saveResult').post((req, res, next) => {
console.log("Inside the save results route", req.body);
  Results.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//Get All Candidates
quizRoute.route('/getresult').get((req, res) => {
  Results.aggregate([
   {$lookup:
     {   from: "candidate",
             localField: "userName",
             foreignField: "username",
             as: "result_users"
     }
   },
   {$sort:
     {
       'updatedDate': -1
     },

   }],
   (error,output) => {
     if (error) {
       return next(error)
     } else {
       res.json(output)
     }
   });
})

/**
 *
 *
 */
quizRoute.route('/quizDetailsByUser/:userName').get((req, res) => {
  console.log('userName',req.params.userName)
  const userName=req.params.userName
  UserAnswer.aggregate(
      [{$match : {userName:req.params.userName}},
          {$lookup:
              {
                  from: "questionBank",
                  let:{ userAnswer_qid: "$questionID"
                      },
                  pipeline: [
                      { $match:
                       { $expr:
                         { $and:
                           [
                            {$eq:  ["$questionID", "$$userAnswer_qid"] }
                          ]
                         }
                       }
                    },
                    { $project: { questionID: 1, _id: 0,question:1,jrss:1,technologyStream:1,questionType:1,answerID:1,options:1 } }
                  ], as: "userAttemptedQs"
              }
          },
          {
              $out:"userQuestions"
          }
      ])

      Results.aggregate(
          [
               {$match : {userName:req.params.userName}},
              {  $lookup: {
                     from: "userQuestions",
                     localField: "quizNumber",
                     foreignField: "quizNumber",
                      as: "userAnswer",
                  }
              }
          ],(error, data) => {
                      if (error) {
                          return next(error)
                        } else {
                         // res.json(data)
                         res.status(200).json({
                          // message: "Posts fetched successfully!",
                           results: data
                         });
                        }
                      }
              )

          })
module.exports = quizRoute;
