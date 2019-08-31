
class BookGetDto {
  constructor(persistedBook) {
    this.id = persistedBook.id;
    this.title = persistedBook.title;
    this.yearPublished = persistedBook.yearPublished;
    this.ISBN = persistedBook.ISBN,
    this.copies = persistedBook.copies;
    this.publisher = persistedBook.publisher;

    if (persistedBook.authors !== undefined) this.authors = this.convertAuthors(persistedBook.authors);
  }

  convertAuthors(persistedAuthors) {
    const convertedAuthors = new Array();
    persistedAuthors.forEach((el) => {
      convertedAuthors.push({
        name: `${el.firstName} ${el.lastName}`,
      });
    });
    return convertedAuthors;
  }
}

module.exports = BookGetDto;
