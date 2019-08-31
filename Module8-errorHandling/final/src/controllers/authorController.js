const AuthorGetDto = require('../dtos/authorGet');
const AuthorPutPostDto = require('../dtos/authorPutPost');
const MongoService = require('../services/mongoService');
const { Book, Author } = require('../services/sequelizeService');
const { ResourceNotFoundError } = require('../errorHandling/errors/validationErrors');

async function getAllAuthors(req, res, next) {
  function extractAuthorsFromResult(persistedAuthorsListRaw) {
    const persistedAuthorList = [];
    persistedAuthorsListRaw.forEach((el) => {
      persistedAuthorList.push(el.dataValues);
    });

    return persistedAuthorList;
  }

  function getAuthorDtoList(persistedAuthorList) {
    const authorDtoList = [];
    persistedAuthorList.forEach((el) => {
      authorDtoList.push(new AuthorGetDto(el));
    });
    return authorDtoList;
  }

  try {
    // const result = await MongoService.Author.find().exec();
    const result = await Author.findAll({ include: [{ model: Book, required: false, attributes: ['title'] }] });
    const extractedAuthors = extractAuthorsFromResult(result);
    const authorGetDtoList = getAuthorDtoList(extractedAuthors);

    return res.status(200).json(authorGetDtoList);
  } catch (err) {
    return next(err);
  }
}

async function createAuthor(req, res, next) {
  try {
    // const Author = new MongoService.Author(req.body);
    // const result = await Author.save();
    const authorPutPostDto = new AuthorPutPostDto(req.body);
    const result = await Author.create(authorPutPostDto);
    const author = new AuthorGetDto(result.dataValues);
    return res.status(200).json(author);
  } catch (err) {
    return next(err);
  }
}

async function getAuthorById(req, res, next) {
  try {
    // const result = await MongoService.Author.findById(req.params.id);
    const result = await Author.findOne({
      where: { id: req.params.id },
      include: [{ model: Book, required: false, attributes: ['title'] }],
    });

    if (result === null) throw new ResourceNotFoundError('Author');
    const authorGetDto = new AuthorGetDto(result.dataValues);

    return res.status(200).json(authorGetDto);
  } catch (err) {
    return next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    // const result = await MongoService.Author.findByIdAndUpdate(req.params.id, req.body);
    const authorPutPostDto = new AuthorPutPostDto(req.body);
    const result = await Author.update(authorPutPostDto, { where: { id: req.params.id } });
    return res.status(200).send(`Updated records: ${result}`);
  } catch (err) {
    return next(err);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    // const result = await MongoService.Author.findByIdAndRemove(req.params.id);
    const result = await Author.destroy({ where: { id: req.params.id } });
    return res.status(200).send(`Deleted records: ${result}`);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
