require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const chalk = require('chalk');
const toolbox = require('../private/toolbox');

const options= {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
  // return with message if no jwt secret is found
  if(!process.env.JWT_SECRET){
    return toolbox.logError('JwtStrategy requires a secret or key for Auth!', 
                      `please add ${chalk.black.bold.bgYellow('JWT_SECRET=<your_secret_key_here>')}`,
                      `to your ${chalk.black.bold.bgYellow('.env')} file and restart nodemon`,
                      '(your secret key can be any string without spaces)');
  }

  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // find User MOdel
    User.findById(jwt_payload.id)
      .then(user => {
        if(user) {
          // If user is found, return null (for error) and user
          return done(null, user);
        }
        // If no user is found
        return done(null, false)
      })
      .catch(error => {
        toolbox.logError('/config/passport.js', 'module.exports', 'User.findById()', error);
      });
  }));
};

// module.exports = () => { toolbox.log(`passport config`) }
