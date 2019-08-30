const {ModelValidationError} = require('../errorHandling/errors/validationErrors');

class AuthorPutPostDto {
  constructor(body) {
    if(!body.firstName) {
      throw new ModelValidationError(body, 'author', 'firstName', 'First name is required');
    }
    this.firstName = body.firstName;

    if(body.lastName) this.lastName = body.lastName;
    if(body.description) this.description = body.description;
    if(body.country) this.country = body.country;
    if(body.city) this.city = body.city;
    if(body.primaryLanguage) this.primaryLanguage = body. primaryLanguage;

  }
}

module.exports = AuthorPutPostDto;
