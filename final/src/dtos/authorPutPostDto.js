// DTO used to define the data that we accept in a request body
// when modifying data records in the database
const { ModelValidationError } = require('../errorHandling/errors/validationErrors');

class AuthorPutPostDto {
  constructor(body) {
    if (!body.firstName) {
      throw new ModelValidationError('author', 'firstName', 'firstName is required');
    }
    this.firstName = body.firstName;

    if (body.lastName) this.lastName = body.lastName;
    if (body.yearBorn) this.yearBorn = body.yearBorn;
    if (body.country) this.country = body.country;
    if (body.city) this.city = body.city;
  }
}

module.exports = AuthorPutPostDto;
