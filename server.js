// required modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const toolbox = require('./private/toolbox');
// for logging
const chalk = require('chalk');
const rowdy = require('rowdy-logger');

// app setup and middlewares
const app = express();
const rowdyResults = rowdy.begin(app);

// private modules
app.use(express.static(__dirname + '/private'));

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

// database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/innervuedb');

const db = mongoose.connection;

db.once('open', () => {
  console.log(chalk.black.bgGreen(`Connected to MongoDB at ${db.host}:${db.port}`));
});

db.on('error', (error) => {
  toolbox.logError('in server.js', 'db.on()', error);
});

// test route
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

// route controllers
app.use('/users', require('./controllers/users'))

// initialize app on port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  rowdyResults.print();
  console.log(chalk.black.bgYellow(` ~~~listening on port: ${port}~~~ `)); 
});

