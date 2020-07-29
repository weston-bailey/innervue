require('dotenv').config();
const express = require('express');
const router = express.Router();
const toolbox = require('../private/toolbox');
// Imports the Google Cloud client library
const language = require(`@google-cloud/language`);
const beautify = require("json-beautify");
// Imports IBM watson tone analyzer
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
// for auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// load mongoDB user model
const User = require('../models/User');

// test route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the users endpoint'});
});

// get user's answered questions from database
router.get('/:userId/questions', (req, res) => {
  let userId = req.params.userId;
  
  User.findOne({ _id: userId }, (error, user) => {
    if (error) {
      // send status 500 and a message user not found
      res.status(500).json({ message: 'database error finding user', error })
      return toolbox.logError('users.js', 'POST /:userId/questions', 'User.findOne()', error)
    }
    if(!user){
      // send status 200 and user not found message
      return res.status(200).json({ message: 'User id not found' })
    }
    // send user's answred questions to client
    res.status(201).json(user.answeredQuestions);
  })
});

// contact google nl API and add answered question to user
router.post('/:userId/questions', (req, res) => {

  // URL query string
  let userId = req.params.userId;
  // question, user's answer and category
  let question = req.body

  // we don't want blank values in the question, return immediately if they are found
  if(!question.answer) return res.json({ message: 'Response is empty! Please submit a valid response!'});
  if(!question.content || !question.category ) return res.json({ message: 'No question selected, please select a question and resubmit!'});
  
  User.findOne({ _id: userId }, (error, user) => {
    if (error) {
      // TODO send error status to client
      res.json({ message: 'database error finding user', error })
      return toolbox.logError('users.js', 'POST /:userId/questions', 'User.findOne()', error)
    }
    if(!user){
      // user not found in database
      return res.json({ message: 'User id not found'  })
    }

    // console.log(question)
    // res.status(201).json(question)

    // return
    // perfrom call APIs, perform analysis on user's answer, 
    (async text => {
      // Instantiates a client
      const client = new language.LanguageServiceClient();

      // Instantiates an IBM Watson tone analyzer
      const toneAnalyzer = new ToneAnalyzerV3({
        // See: https://github.com/watson-developer-cloud/node-sdk#authentication
        version: '2017-09-21',
      });

      // format user's answer into a google langauge document
      const document = {
        content: text,
        type: `PLAIN_TEXT`,
      };

      // hit the google APIs at same time, don't proceed until all have responded
      const [analyzeSentiment, analyzeEntitySentiment] = await Promise.all([
        client.analyzeSentiment({document: document}),
        client.analyzeEntitySentiment({document: document}),
      ]);

      // Array of 'utterances' to send to IBM watson 
      let utterances = []

      // pull each sentence out of the analyzeSentiment response from Google
      analyzeSentiment[0].sentences.forEach(sentence => {
        let textContent = sentence.text.content;
        // format utterances for IBM watson
        utterances.push({ text: textContent, user: 'user' });
      });

      // Contact IBM watson
      toneAnalyzer.toneChat({utterances: utterances})
      .then(response => {
          // load up an object with data from the APIs
          let payload = {
            analyzeSentiment,
            analyzeEntitySentiment,
            analyzeTone: response.result
          }

          // uncomment these lines to explore that beautiful blob of data in the console
          // print = beautify(payload.analyzeSentiment, null, 2, 10);
          // console.log(print)

          // format analysis based on sentiment 
          let analysis = {}
          analysis.negativeMentions = []

          // return if the answer was too short
          if(payload.analyzeTone.utterances_tone.length < 4) return res.json({ message: 'Responses must be at least four sentances in length!'});

          // search for any entities that have negative sentiment associated with them
          payload.analyzeEntitySentiment[0].entities.forEach(mention => {
            if(mention.sentiment.score < -.5){
              analysis.negativeMentions.push(mention.name);
            }
          });

          //Overall sentiment of users's answer
          let score = payload.analyzeSentiment[0].documentSentiment.score;
          console.log(score)
          analysis.overallScore = (score < 0 ? "negative" :
                                   score < .5 ? "neutral" :
                                   "positve");

          let magnitude = payload.analyzeSentiment[0].documentSentiment.magnitude;
          console.log(magnitude)
          analysis.overallMagnitude = (magnitude < 1 ? "somewhat" :
                                       magnitude < 2 ? "moderately" :
                                       magnitude < 3 ? "clearly" :
                                       "extremely"); 

          // provide some feedback based on overall sentiment score
          switch(analysis.overallScore){
            case "negative" :
              analysis.overallFeedback = "Your response reflects a negative sentiment. We suggest modifying your response to communicate more effectively.";
              break;
            case "neutral" :
              analysis.overallFeedback = "Your response is looking good, try modifying it some more to make it more impactful.";
              break;
              case "positve" :
                analysis.overallFeedback = "You response reflects a clearly positive sentiment. This will appeal to interviewers!";
              break;
            default :
              analysis.overallFeedback = "Oh no! something went wrong! 😕"
          }

          //mount analysis on question object
          question.analysis = analysis;

          // push question to user's embedded question document
          user.answeredQuestions.push(question);
          
          // save user in database
          user.save((error, user) => {
            if (error) { 
              // TODO send error status to client
              res.json({ message: 'database error saving user', error })
              return toolbox.logError('users.js', 'POST /:userId/questions', 'user.save()', error)
            }
            // respond to client with question
            res.status(201).json(question)
          })
        })
        .catch(error => console.error(error));
    })(question.answer);
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
      res.json({ message: 'User Already Exists!' });
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
        res.json({ message: 'Creating New User!' });
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
      return res.json({ message: 'User not found' })
    }

    // TODO bcrypt compare passwords

    if(password !== user.password){

      // TODO create jwt token payload

      // TODO sign token

      // TODO send jwt token

      return res.json({ message: 'Passwords do not match'  })
    } else {
      // TODO send status to client
      return res.json({ message: 'User Found, credentials match!' })
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
      return res.status(200).json({ message: 'No user found with that email!' });
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
          // answeredQuestions: user.answeredQuestions 
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
        // send status 200 if password is incorrect
        return res.status(200).json({ message: 'Password or email is incorrect' })
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
      return res.status(200).json({ message: 'Email already exists in database' });
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
              // answeredQuestions: user.answeredQuestions 
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
  // res.json({ message: 'Success' })
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
