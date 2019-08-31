module.exports = (sequelize, type) => sequelize.define('book', {
  title: {
    type: type.STRING,
    allowNull: false,
  },
  title: type.STRING,
  yearPublished: type.INTEGER,
  ISBN: type.STRING,
  copies: type.INTEGER,
  publisher: type.STRING,
});
