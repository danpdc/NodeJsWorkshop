// DTO used when we want to expose data from the database via a GET request
class BookGetDto {
  constructor(dbBook) {
    this.id = dbBook.id;
    this.title = dbBook.title;
    this.yearPublished = dbBook.yearPublished;
    this.ISBN = dbBook.ISBN;
    this.availableCopies = dbBook.availableCopies;

    if (dbBook.authors !== undefined) this.authors = this.convertAuthors(dbBook.authors);
  }

  convertAuthors(persistedAuthors) {
    const convertedAuthors = [];
    persistedAuthors.forEach((el) => {
      convertedAuthors.push({
        name: `${el.firstName} ${el.lastName}`,
      });
    });
    return convertedAuthors;
  }
}

module.exports = BookGetDto;
