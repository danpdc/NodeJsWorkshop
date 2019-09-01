const BookGetDto = require('../dtos/bookGet');

function extractBooksFromResult(persistedBookListRaw) {
  const persistedBookList = [];
  persistedBookListRaw.forEach((el) => {
    persistedBookList.push(el.dataValues);
  });

  return persistedBookList;
}

function getBookDtoList(persistedBookList) {
  const bookDtoList = [];
  persistedBookList.forEach((el) => {
    bookDtoList.push(new BookGetDto(el));
  });
  return bookDtoList;
}

module.exports = {
  extractBooksFromResult,
  getBookDtoList
}
