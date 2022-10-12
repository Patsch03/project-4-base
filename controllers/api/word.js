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
    const word = new Word(req.body);
    word.save()
}

