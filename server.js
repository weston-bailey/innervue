// required modules
require('dotenv').config();
const Express = require('express');
// for logging
const chalk = require('chalk');
const rowdy = require('rowdy-logger');

// app setup and middlewares
const app = Express();
const rowdyResults = rowdy.begin(app);

app.use(Express.static(__dirname + '/private'));

// database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
const User = require('./models/User');

db.once('open', () => {
  console.log(chalk.black.bgGreen(`Connected to MongoDB at ${db.host}:${db.port}`));
});

db.on('error', (err) => {
  console.log(chalk.black.bgRed(`database error ${err}`));
});

// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

User.create({
  firstName: 'test first',
  lastName: 'test last',
  email: 'test@test.com',
  password: '12345678'
  }, (err, user) => {
    if (err) return console.error('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n', err, '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
    console.log(user);
})

// innervueDb

// initialize app on port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  rowdyResults.print();
  console.log(chalk.black.bgYellow(` ~~~listening on port: ${port}~~~ `)); 
});

