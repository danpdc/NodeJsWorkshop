const {ModelValidationError} = require('../errorHandling/errors/validationErrors');

class BookPutPostDto {
  constructor(body) {
    if(!body.title) {
      throw new ModelValidationError(body, 'book', 'title', 'Title is required');
    }
    this.title = body.title;

    if(body.yearPublished) this.yearPublished = body.yearPublished;
    if(body.ISBN) this.ISBN = body.ISBN;
    if(body.copies) this.copies = body.copies;
    if(body.publisher) this.publisher = body.publisher;
  }
}

module.exports = BookPutPostDto;
