const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const wordSchema = new Schema({
    word: {type: String},
    results: {type: Array},
    // definition: {type: String},
    // partOfSpeech: {type: String},
    // synonyms: {type: Array},
    
    
})


module.exports = mongoose.model('Word', wordSchema);