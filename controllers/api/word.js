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
    Word.exists({word: req.body.word}, function(err, docs){
        if(docs == null){
            const word = new Word(req.body);
            word.save()
        }else{
            console.log("duplicate")
        }
    })
}

    // needs duplication implementation
    // can only create one per refresh



