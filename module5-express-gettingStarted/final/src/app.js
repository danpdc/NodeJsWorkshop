const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 6501;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}\\index.html`));
});

module.exports.start = () => {
  app.listen(port, () => {
    debug(`Listening on port ${chalk.green(port)}`);
  });
};
