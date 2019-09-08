
module.exports = (sequelize, type) => sequelize.define('book', {
  title: type.STRING,
  yearPublished: type.NUMBER,
  ISBN: type.STRING,
  availableCopies: type.NUMBER,
});
