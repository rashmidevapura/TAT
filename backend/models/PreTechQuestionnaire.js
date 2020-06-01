const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let PreTechQuestionnaire = new Schema({
    preTechQID: {
      type: Number
   },
   jrss: {
      type: String
   },
   preTechQuestion: {
         type: String
   },
   
   createdBy: {
         type: String
   },
   createdDate: {
         type: Date
   },
}, {
   collection: 'PreTechQuestionnaire'
})

module.exports = mongoose.model('PreTechQuestionnaire', PreTechQuestionnaire)
