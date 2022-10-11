const { db } = require('../../models/word');
const Word = require('../../models/word');

module.exports = {
  create,
};


function create(req, res) {
        const word = new Word(req.body);
        word.save()
}