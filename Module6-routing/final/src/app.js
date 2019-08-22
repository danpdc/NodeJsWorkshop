const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bookRouter = require('./routers/bookRouter');

const app = express();
const port = process.env.PORT || 6501;

app.use('/api/books', bookRouter.routes);

app.use(morgan('dev'));

app.use("/", (req, res, next) => {
  debug('Hello from first middleware');
  next();
});

app.use("/", (req, res, next) => {
  debug('Hello from second middleware');
  next();
});

app.use('/me', (req, res, next) => {
  debug('Hello from single purpose middleware');
  next();
});

app.use('/you', (req, res, next) => {
  debug('Hello from YOU middleware');
  next();
});

app.get('/', (req, res) => {
  debug('/ controller');
  res.sendFile(path.join(`${__dirname}\\index.html`));
});

app.get('/me', (req, res) => {
  debug('/me controller');
  res.send('This is from controller');
});

module.exports.start = () => {
  app.listen(port, () => {
    debug(`Listening on port ${chalk.green(port)}`);
  });
};
