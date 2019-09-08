// This is a mapper used to help converting raw book data from the database
// to the "book" data we want to expose via a DTO
const BookGetDto = require('../bookGetDto');

// Extracts only "book" related information from the raw result
function extractBooksFromResult(persistedBookListRaw) {
  const persistedBookList = [];
  persistedBookListRaw.forEach((el) => {
    persistedBookList.push(el.dataValues);
  });

  return persistedBookList;
}

// Converts a list of books as they are shaped by the database
// and converts them into DTOs that we want to expose
function getBookDtoList(persistedBookList) {
  const bookDtoList = [];
  persistedBookList.forEach((el) => {
    bookDtoList.push(new BookGetDto(el));
  });
  return bookDtoList;
}

module.exports = {
  extractBooksFromResult,
  getBookDtoList,
};
