const { db } = require('../../models/word');
const Word = require('../../models/word')

module.exports = {
  create,
  getWords,
};


function getWords(req,res){
    // Grabs all words in database
    Word.find({}, function(err, docs){
        if(!err){
            // sends words as a json to localhost:3001/words-list to be retrieved by frontend
            res.send(docs)
        }else{
            res.send(err)
        }
    });
}

function create(req, res) {
    // preventing duplicates, sees if any word exists that matches the word searched
    Word.exists({word: req.body.word}, function(err, docs){
        if(docs == null){
            // creates word if no duplicates exist
            let word = new Word(req.body);
            word.save()
        }else{
            console.log("duplicate")
        }
    })


}


