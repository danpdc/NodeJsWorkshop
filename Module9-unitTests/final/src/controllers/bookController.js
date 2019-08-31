const BookGetDto = require('../dtos/bookGet');
const BookPutPostDto = require('../dtos/bookPutPost');
const MongoService = require('../services/mongoService');
const { Book, Author } = require('../services/sequelizeService');
const { ResourceNotFoundError } = require('../errorHandling/errors/validationErrors');

async function getAllBooks(req, res, next) {
  // const result = await MongoService.Book.find().exec();
  // if(result === undefined || result === null) {
  //   return res.status(500).send('Internal server error')
  // }
  // return res.status(200).json(result);
  try {
    const result = await Book.findAll({
      include: [{
        model: Author,
        required: false,
        attributes: ['firstName', 'lastName'],
      }],
    });

    const extractedBooks = extractBooksFromResult(result);

    function extractBooksFromResult(persistedBookListRaw) {
      const persistedBookList = new Array();
      persistedBookListRaw.forEach((el) => {
        persistedBookList.push(el.dataValues);
      });

      return persistedBookList;
    }

    const bookGetDtoList = getBookDtoList(extractedBooks);

    function getBookDtoList(persistedBookList) {
      const bookDtoList = new Array();
      persistedBookList.forEach((el) => {
        bookDtoList.push(new BookGetDto(el));
      });
      return bookDtoList;
    }

    return res.status(200).json(bookGetDtoList);
  } catch (err) {
    return next(err);
  }
}

async function createBook(req, res, next) {
  try {
    // const Book = new MongoService.Book(req.body);
    const bookPutPostDto = new BookPutPostDto(req.body);
    const createdBookFromDb = await Book.create(bookPutPostDto);
    const book = new BookGetDto(createdBookFromDb.dataValues);
    return res.status(200).json(book);
    // const result = await Book.save();
  } catch (err) {
    return next(err);
  }
}

async function getBookById(req, res, next) {
  try {
    // const result = await MongoService.Book.findById(req.params.id).exec();
    const result = await Book.findOne({
      where: { id: req.params.id },
      include: [{ model: Author, required: false, attributes: ['firstName', 'lastName'] }],
    });
    if (result === null) throw new ResourceNotFoundError('Book');
    const bookGetDto = new BookGetDto(result.dataValues);

    return res.status(200).json(bookGetDto);
  } catch (err) {
    return next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    // const result = await MongoService.Book.findByIdAndUpdate(req.params.id, req.body);
    const bookPutPostDto = new BookPutPostDto(req.body);
    const result = await Book.update(bookPutPostDto, { where: { id: req.params.id } });
    return res.status(200).send(`Updated records: ${result}`);
  } catch (err) {
    return next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    // const result = await MongoService.Book.findByIdAndRemove(req.params.id);
    const result = await Book.destroy({ where: { id: req.params.id } });
    return res.status(200).send(`Deleted records: ${result}`);
  } catch (err) {
    return next(err);
  }
}

async function getBookAuthors(req, res, next) {
  try {
    const result = await Book.findOne(
      {
        where: {
          id: req.params.bookId,
        },
        include: [{ model: Author, required: false, attributes: ['firstName', 'lastName'] }],
      },
    );
    if (result === null) throw new ResourceNotFoundError('Book');
    const bookDto = new BookGetDto(result.dataValues);

    return res.status(200).json(bookDto.authors);
  } catch (err) {
    return next(err);
  }
}

async function insertBookAuthor(req, res, next) {
  try {
    const result = await Book.findOne({ where: { id: req.params.bookId } });

    if (result === null) throw new Error(`No book with ID: ${req.params.id} was found in the database`);

    await result.addAuthor(req.params.authorId);
    const bookDto = new BookGetDto(result.dataValues);
    return res.status(200).json(bookDto);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getBookAuthors,
  insertBookAuthor,
};
