const { db } = require('../../models/word');
const Word = require('../../models/word');

module.exports = {
  create,
  getWords,
};

function getWords(req,res){
    Word.find({}, function(err, docs){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    });
}

function create(req, res) {
    console.log(req.body.word)
    let bool = false;
    Word.exists({word: req.body.word}, function(err, docs){
        bool = true;
    })
    console.log(bool)
    if(!bool){
        console.log("created word function thing")
        const word = new Word(req.body);
        word.save()
    }else{
        console.log("already exists")
    }

}

