require('dotenv').config();
const express = require('express');
const router = express.Router();
const toolbox = require('../private/toolbox');
// Imports the Google Cloud client library
const language = require(`@google-cloud/language`);
const beautify = require("json-beautify");
// for auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// load mongoDB user model
const User = require('../models/User');

// test route
router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the users endpoint'});
});

// get user's answered questions from database
router.get('/:userId/questions', (req, res) => {
  let userId = req.params.userId;
  
  User.findOne({ _id: userId }, (error, user) => {
    if (error) {
      // TODO send error status to client
      res.json({ msg: 'database error finding user', error })
      return toolbox.logError('users.js', 'POST /:userId/questions', 'User.findOne()', error)
    }
    if(!user){
      // user not found in database
      // TODO send error status to client
      return res.json({ msg: 'User id not found', userId })
    }
    // send user's answred questions to client
    res.json(user.answeredQuestions);

  })
});

// contact google nl API and add answered question to user
router.post('/:userId/questions', (req, res) => {

  // URL query string
  let userId = req.params.userId;
  // request body params: preformatted JSON of the question that was answered
  let question = req.body.answer
  console.log(question)
  User.findOne({ _id: userId }, (error, user) => {
    if (error) {
      // TODO send error status to client
      res.json({ msg: 'database error finding user', error })
      return toolbox.logError('users.js', 'POST /:userId/questions', 'User.findOne()', error)
    }
    if(!user){
      // user not found in database
      // TODO send error status to client
      return res.json({ msg: 'User id not found', userId })
    }

  // TODO Contact google API
  const text = question
  // The text to analyze
  const document = {
    content: text,
    type: `PLAIN_TEXT`,
  };

  async function googleCloud(document) {
    // Instantiates a client
    const client = new language.LanguageServiceClient();

    // hit all APIs at same time, don't proceed until all have responded
    const [analyzeSentiment, analyzeEntities, /*analyzeSyntax,*/ analyzeEntitySentiment] = await Promise.all([
      client.analyzeSentiment({document: document}),
      client.analyzeEntities({document: document}), 
      // client.analyzeSyntax({document: document}),
      client.analyzeEntitySentiment({document: document}),
    ]);

    // load up an object with data from the APIs
    let payload = {
      analyzeSentiment,
      analyzeEntities,
      // analyzeSyntax,
      analyzeEntitySentiment
    }

    // make it pretty
    print = beautify(payload, null, 2, 10);   
    console.log(print) 
  }

  googleCloud(document);

    // TODO format user feedback based on sentiment analysis

    // TODO mount analysis on question

    // update user in database
    user.answeredQuestions.push(question)
    // console.log(user)
    // user.save((error, user) => {
    //   if (error) { 
    //     // TODO send error status to client
    //     res.json({ msg: 'database error saving user', error })
    //     return toolbox.logError('users.js', 'POST /:userId/questions', 'user.save()', error)
    //   }

    //   // TODO send answered question with analysis to client

    //   // send updated user --> want it to send back the analyzed question
    //   res.json(user)
    // })

  })

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
      
      // TODO Salt and Hash password with bcrypt-js, then save new user 

      newUser.save((error, user) => {  
        if (error) { 
          // TODO send error status to client
          return toolbox.logError(error) 
        }
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
      // user was not found
      // TODO send error status to client
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

// AUTH ROUTES FOR TESTING TODO: REMOVE/Inegrate with app routes

// do login auth and log user in
router.post('/auth/login', (req, res) => {
  // data from request body
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }, (error, user) => {
    if (error) {
      // send status 500 server error
      res.status(500).json({ message: 'Internal database error finding user! Please try again.', error });
      return toolbox.logError('users.js', 'POST /login', 'User.findOne()', error)
    }

    if(!user){
      // if user is not found respond with status 400 bad request
      // TODO stop sending email and password back
      return res.status(400).json({ message: 'No user found with that email!', email, password});
    }

    // bcrypt compare passwords
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        // if passwords match, create and send JSON Web Token
        const payload = { 
          id: user.id, 
          firstName: user.firstName, 
          lastName: user.lastName, 
          fullName: user.getFullName(),
          answeredQuestions: user.answeredQuestions 
        }

        // Sign token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
          if (error) {
            // send status 500 server error
            res.status(500).json({ message: 'Internal jwt token error authorizing user! Please try again.', error });
            return toolbox.logError('users.js', 'POST /login', 'jwt.sign()', error)
          }
          // send status 201 if sign in successful
          return res.status(201).json({ success: true, token: 'Bearer ' + token })
        });
      } else {
        // send status 400 if password is incorrect
        return res.status(400).json({ message: 'Password or email is incorrect' })
      }
    })
  })
});

// do registration auth and create a new user
router.post('/auth/register', (req, res) => {
  // data from request body (all are required to write to the database)
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }, (error, user) => {
    if (error) {
      // send status 500 server error
      res.status(500).json({ message: 'internal database error finding user! Please try again.', error });
      return toolbox.logError('users.js', 'POST /register', 'User.findOne()', error)
    }

    if(user){
      // if user is found respond with status 400 bad request
      // TODO stop sending user object
      return res.status(400).json({ message: 'Email already exists in database', user});
    } else {
      // if user is not found create a new one
      // create new user
      let newUser = new User({
        firstName,
        lastName,
        email,
        password,
      })
      // Salt and Hash password with bcrypt-js, then save new user 
      bcrypt.genSalt(10, (error, salt) => {
        if (error) {
          // send status 500 server error
          res.status(500).json({ message: 'Internal bcrypt error creating user! Please try again.', error });
          return toolbox.logError('users.js', 'POST /register', 'bcrypt,genSalt()', error)
        }

        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            // send status 500 server error
            res.status(500).json({ message: 'Internal bcrypt error creating user! Please try again.', error });
            return toolbox.logError('users.js', 'POST /register', 'bcrypt.hash()', error)
          }

          newUser.password = hash;
          newUser.save((error, user) => {  
            if (error) { 
              // send status 500 server error
              res.status(500).json({ message: 'internal database error saving user! Please try again.', error });
              return toolbox.logError('users.js', 'POST /register', 'newUser()', error) 
            }

            // once new user is saved create and send JSON Web Token
            const payload = { 
              id: user.id, 
              firstName: user.firstName, 
              lastName: user.lastName, 
              fullName: user.getFullName(),
              answeredQuestions: user.answeredQuestions 
            }

            // Sign token
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
              if (error) {
                // send status 500 server error
                res.status(500).json({ message: 'Internal jwt token error authorizing user! Please try again.', error });
                return toolbox.logError('users.js', 'POST /login', 'jwt.sign()', error)
              }
              // send status 201 if sign in successful
              return res.status(201).json({ success: true, token: 'Bearer ' + token })
            });
          })

        })
      })
    }
  })
});

router.get('/auth/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // res.json({ msg: 'Success' })
  // res.json(req.user);
  // respond wit user data -- TODO figure out what kind of request to hit this route with
  res.json({ 
    id: req.user.id, 
    firstName: req.user.firstName, 
    lastName: req.user.lastName, 
    fullName: req.user.getFullName(),
    answeredQuestions: req.user.answeredQuestions 
  });

});

module.exports = router;
