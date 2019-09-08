// This is a mapper used to convert between an author as we receive from the database
// and and author DTO

const AuthorGetDto = require('../authorGetDto');

// This function extracts only the author data from the raw information
// that we receive fromthe database
function extractAuthorsFromRawResult(dbAuthors) {
  const persistedAuthors = [];
  dbAuthors.forEach((el) => {
    persistedAuthors.push(el.dataValues);
  });

  return persistedAuthors;
}

// This function converts the author information from the database
// to what we want to expose in the AuthorGet DTO
function getAuthorDtoList(persistedAuthors) {
  const authorDtoList = [];
  persistedAuthors.forEach((el) => {
    authorDtoList.push(new AuthorGetDto(el));
  });
  return authorDtoList;
}

module.exports = {
  extractAuthorsFromRawResult,
  getAuthorDtoList,
};
