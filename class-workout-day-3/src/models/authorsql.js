module.exports = (sequelize, type) => sequelize.define('author', {
  firstName: type.STRING,
  lastName: type.STRING,
  yearBorn: type.NUMBER,
  city: type.STRING,
  country: type.STRING,
});
