const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>🐡 Welcome to the users controller! 🐡</h1>');
});

router.get('/:userId/questions', (req, res) => {
  let userId = req.params.userId;
  res.send(`<h1>🦦Get user ${userId}'s answered quesitons 🦦</h1>`);
});

router.post('/:userId/questions', (req, res) => {
  let userId = req.params.userId;
  res.send(`<h1>🐈 Add an answered question for user ${userId} 🐈</h1>`);
});

router.post('/register', (req, res) => {
  res.send('<h1>🐿 Register a user 🐿</h1>');
});

router.post('/login', (req, res) => {
  res.send('<h1>🦥 Log user in 🦥</h1>');
});

router.get('/current', (req, res) => {
  res.send('<h1>🦘 Check user credentials 🦘</h1>');
});



module.exports = router;
