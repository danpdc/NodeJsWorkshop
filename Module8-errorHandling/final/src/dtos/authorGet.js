
class AuthorGetDto {
  constructor(persistedAuthor) {
    this.id = persistedAuthor.id;
    this.firstName = persistedAuthor.firstName;
    this.lastName = persistedAuthor.lastName;
    this.description = persistedAuthor.description;
    this.country = persistedAuthor.country;
    this.city = persistedAuthor.city;
    this.primaryLanguage = persistedAuthor.primaryLanguage;

    if(persistedAuthor.books !== undefined)
      this.books = this.extractBooks(persistedAuthor.books);
  }

  extractBooks(persistedBooks) {
    let extractedBooks = new Array();
    persistedBooks.forEach(el => {
      extractedBooks.push({
        title: el.title
      });
    });
    return extractedBooks;
  }
}

module.exports = AuthorGetDto;
