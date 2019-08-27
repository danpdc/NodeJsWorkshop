// Required modules
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bookRouter = require('./routers/bookRouter');
const authorRouter = require('./routers/authorRouter');

// App constants
const app = express();
const port = process.env.PORT || 6501;

// Middleware
app.use(morgan('dev'));

app.use('/api/books', bookRouter.routes);
app.use('/api/authors', authorRouter.routes);

// Routes and controllers
app.get('/', (req, res) => {
  debug('/ controller');
  res.sendFile(path.join(`${__dirname}\\index.html`));
});

// Exporting app module
module.exports.start = () => {
  app.listen(port, () => {
    debug(`Listening on port ${chalk.green(port)}`);
  });
};
