const express = require('express');
const dotenv = require('dotenv').config();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const bookRouter = require('./routers/bookRouter');
const authorRouter = require('./routers/authorRouter');
const errorHandler = require('./errorHandling/handlers/expressErrorHandler');

const port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/books', bookRouter.routes);
app.use('/api/authors', authorRouter.routes);

app.get('/', (req, res) => {
  res.send('Working');
});
app.use('*', (req, res, next) => {
  console.log('test');
});
app.use('*', errorHandler);

module.exports.start = () => {
  app.listen(port, () => {
    console.log(`API listening on port ${chalk.green(port)}`);
  });
};
