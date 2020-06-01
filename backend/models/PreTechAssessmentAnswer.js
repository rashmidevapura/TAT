const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let PreTechAssessmentAnswer = new Schema({
    userName: {
      type: String
   },
   preTechQID: {
      type: Number
   },
   answer: {
         type: String
   },
   
   createdDate: {
         type: Date
   },
}, {
   collection: 'PreTechAssessmentAnswer'
})

module.exports = mongoose.model('PreTechAssessmentAnswer', PreTechAssessmentAnswer)
