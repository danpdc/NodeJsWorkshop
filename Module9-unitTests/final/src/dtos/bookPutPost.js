const { ModelValidationError } = require('../errorHandling/errors/validationErrors');

class BookPutPostDto {
  constructor(body) {
    if (!body.title) {
      throw new ModelValidationError(body, 'book', 'title', 'Title is required');
    }
    this.title = body.title;

    if (body.yearPublished) this.yearPublished = body.yearPublished;
      else this.yearPublished = null;
    if (body.ISBN) this.ISBN = body.ISBN;
      else this.ISBN = null;
    if (body.copies) this.copies = body.copies;
      else this.copies = 0;
    if (body.publisher) this.publisher = body.publisher;
      else this.publisher = null;
  }
}

module.exports = BookPutPostDto;
