// required modules
require('dotenv').config();
const Express = require('express');
// for logging
const chalk = require('chalk');
const rowdy = require('rowdy-logger');
const toolbox = require('./private/toolbox');

// app setup and middlewares
const app = Express();
const rowdyResults = rowdy.begin(app);

app.use(Express.static(__dirname + '/private'));

// database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/innervueDB');

const db = mongoose.connection;
const User = require('./models/User');

db.once('open', () => {
  console.log(chalk.black.bgGreen(`Connected to MongoDB at ${db.host}:${db.port}`));
});

db.on('error', (error) => {
  toolbox.logError('in server.js', 'db.on()', error);
});

// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

// User.create({
//   firstName: 'test first',
//   lastName: 'test last',
//   email: 'test@test.com',
//   password: '12345678'
//   }, (err, user) => {
//     if (err) return toolbox.logError(err);
//     console.log(user);
// })

// initialize app on port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  rowdyResults.print();
  console.log(chalk.black.bgYellow(` ~~~listening on port: ${port}~~~ `)); 
});

