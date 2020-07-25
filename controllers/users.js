const express = require('express');
const router = express.Router();

// test route
router.get('/', (req, res) => {
  res.send('<h1>🐡 Welcome to the users controller! 🐡</h1>');
});

// get user's answered questions from database
router.get('/:userId/questions', (req, res) => {
  let userId = req.params.userId;
  res.send(`<h1>🦦Get user ${userId}'s answered quesitons 🦦</h1>`);
});

// contact google sentiment API and add answered question to user
router.post('/:userId/questions', (req, res) => {
  let userId = req.params.userId;
  res.send(`<h1>🐈 Add an answered question for user ${userId} 🐈</h1>`);
});

// do registration auth and create a new user
router.post('/register', (req, res) => {
  res.send('<h1>🐿 Register a user 🐿</h1>');
  // const User = require('./models/User');
  // User.create({
  //   firstName: 'test first',
  //   lastName: 'test last',
  //   email: 'testererererer@test.com',
  //   password: '12345678'
  //   }, (err, user) => {
  //     if (err) return toolbox.logError(err);
  //     user.answeredQuestions.push({
  //       category: 'test category',
  //       content: 'test content',
  //       analysis: {
  //         key1: 'test key1',
  //         key2: 'test key2'
  //       }
  //     })
  //     user.save(error => toolbox.logError(error))
  // })
});

// do login auth and log user in
router.post('/login', (req, res) => {
  res.send('<h1>🦥 Log user in 🦥</h1>');
});

router.get('/current', (req, res) => {
  res.send('<h1>🦘 Check user credentials 🦘</h1>');
});



module.exports = router;
