// DTO used when we want to expose data from the database via a GET request
class AuthorGetDto {
  constructor(persistedAuthor) {
    this.id = persistedAuthor.id;
    this.firstName = persistedAuthor.firstName;
    this.lastName = persistedAuthor.lastName;
    this.yearBorn = persistedAuthor.yearBorn;
    this.country = persistedAuthor.country;
    this.city = persistedAuthor.city;

    if (persistedAuthor.books !== undefined) this.books = this.extractBooks(persistedAuthor.books);
  }

  extractBooks(persistedBooks) {
    const extractedBooks = [];
    persistedBooks.forEach((el) => {
      extractedBooks.push({
        title: el.title,
      });
    });
    return extractedBooks;
  }
}

module.exports = AuthorGetDto;
