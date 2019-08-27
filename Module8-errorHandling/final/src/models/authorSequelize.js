module.exports = (sequelize, type) => {
  return sequelize.define('author', {
    firstName: type.STRING,
    lastName: type.STRING,
    description: type.TEXT,
    country: type.STRING,
    city: type.STRING,
    primaryLanguage: type.STRING
  })
}
