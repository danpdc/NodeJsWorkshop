// DTO used to define the data that we accept in a request body
// when modifying data records in the database
const { ModelValidationError } = require('../errorHandling/errors/validationErrors');

class BookPutPostDto {
  constructor(body) {
    if (!body.title) {
      throw new ModelValidationError('book', 'title', 'Title is required');
    }
    this.title = body.title;

    if (body.yearPublished) this.yearPublished = body.yearPublished;
    else this.yearPublished = null;
    if (body.ISBN) this.ISBN = body.ISBN;
    else this.ISBN = null;
    if (body.availableCopies) this.availableCopies = body.availableCopies;
    else this.availableCopies = 0;
  }
}

module.exports = BookPutPostDto;
