// This is where we boostrap our Express server

// Imports
const express = require('express');
const dotenv = require('dotenv').config();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const bookRouter = require('./routers/bookRouter');
const authorRouter = require('./routers/authorRouter');
const errorHandler = require('./errorHandling/handlers/expressErrorHandler');

// Setting up server level constants
const port = process.env.PORT;

// Create the Express server
const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routers
app.use('/api/books', bookRouter.routes);
app.use('/api/authors', authorRouter.routes);

app.get('/', (req, res) => {
  res.send('Working');
});

// Error handling middleware
app.use('*', errorHandler);

// Export "start" function to start the server
module.exports.start = () => {
  app.listen(port, () => {
    console.log(`API listening on port ${chalk.green(port)}`);
  });
};
