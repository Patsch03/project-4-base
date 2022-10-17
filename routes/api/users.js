const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const wordCtrl = require('../../controllers/api/word')

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);




// WORD CREATE
router.post('/create-word', wordCtrl.create);

// JSON response of all words
router.get('/word-list', wordCtrl.getWords);

module.exports = router;