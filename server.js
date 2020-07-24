// required modules
require('dotenv').config();
const Express = require('express');
const chalk = require('chalk');
const rowdy = require('rowdy-logger');

// app setup and middlewares
const app = Express();
const rowdyResults = rowdy.begin(app);

app.use(Express.static(__dirname + '/private'));

// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

// initialize app on port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  rowdyResults.print();
  console.log(chalk.black.bgYellow(` ~~~listening on port: ${port}~~~ `)); 
});

