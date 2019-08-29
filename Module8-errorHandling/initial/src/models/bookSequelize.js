module.exports = (sequelize, type) => {
  return sequelize.define('book', {
    title: type.STRING,
    yearPublished: type.INTEGER,
    ISBN: type.STRING,
    copies: type.INTEGER,
    publisher: type.STRING
  })
}
