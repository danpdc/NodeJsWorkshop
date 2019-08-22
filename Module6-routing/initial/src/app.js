const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 6501;
const bookRouter = express.Router();

app.use(morgan('dev'));

bookRouter.route('/books')
  .get((req, res) => {
    const book = { name: 'Pro .NET Memor Management', author: 'Konrad Kokosa', yearPublished: 2018 };

    res.status(200).json(book);
  });
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}\\index.html`));
});

module.exports.start = () => {
  app.listen(port, () => {
    debug.log(`Listening on port ${chalk.green(port)}`);
  });
};
