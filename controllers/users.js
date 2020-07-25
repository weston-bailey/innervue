const express = require('express');
const router = express.Router();

// load user model
const User = require('../models/User');
const toolbox = require('../private/toolbox');

// test route
router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the users endpoint'});
});

// get user's answered questions from database
router.get('/:userId/questions', (req, res) => {
  let userId = req.params.userId;
  res.send(`<h1>🦦Get user ${userId}'s answered quesitons 🦦</h1>`);
});

// contact google sentiment API and add answered question to user
router.post('/:userId/questions', (req, res) => {
  // URL query string
  let userId = req.params.userId;
  // request body params 
  console.log(request.body)
  res.send(`<h1>🐈 Add an answered question for user ${userId} 🐈</h1>`);
});

// do registration auth and create a new user
router.post('/register', (req, res) => {
  // data from request body (all are required to write to the database)
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }, (error, user) => {
    if (error) {
    // TODO send error status to client
      return toolbox.logError('users.js', 'POST /register', 'User.findOne()', error)
    }
    if(user){
      // if user is found respond with user object
      // TODO respond with status to client
      res.json({ message: 'User Already Exists!', user });
    } else {
      // if user is not found create a new one
      // create new user
      let newUser = new User({
        firstName,
        lastName,
        email,
        password,
      })
      
      // TODO Salt and Hash password with bcryptjs, then save new user 

      newUser.save((error, user) => {  
        if (error) { 
          // TODO send error status to client
          return toolbox.logError(error) 
        };
        res.json({ message: 'Creating New User!', user });
      })
    }
  })
});

// do login auth and log user in
router.post('/login', (req, res) => {
  // data from request body
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }, (error, user) => {
    if (error) {
    // TODO send error status to client
      return toolbox.logError('users.js', 'POST /login', 'User.findOne()', error)
    }
    if(!user){
      return res.json({ msg: 'User not found', email, password })
    }

    // TODO bcrypt compare passwords

    if(password !== user.password){
      // TODO create jwt token payload
      // TODO sign token
      // TODO send jwt token
      return res.json({ msg: 'Passwords do not match', email, password, user })
    } else {
      // TODO send status to client
      return res.json({ msg: 'User Found, credentials matche!', email, password, user })
    }
  })
});

router.get('/current', (req, res) => {
  // TODO send user info
  res.send('<h1>🦘 Check user auth credentials 🦘</h1>');
});

module.exports = router;
