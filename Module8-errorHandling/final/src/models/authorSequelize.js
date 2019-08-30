module.exports = (sequelize, type) => {
  return sequelize.define('author', {
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    lastName: type.STRING,
    description: type.TEXT,
    country: type.STRING,
    city: type.STRING,
    primaryLanguage: type.STRING
  })
}
