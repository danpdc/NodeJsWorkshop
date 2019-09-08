// Controller for the "books" resource. Also includes the ability to add authors to books

// const mongo = require('../services/mongoService');
const { Book, Author } = require('../services/sqlService');
const { ResourceNotFoundError } = require('../errorHandling/errors/validationErrors');
const BookGetDto = require('../dtos/bookGetDto');
const mapper = require('../dtos/mappers/bookMapper');
const BookPutPostDto = require('../dtos/bookPutPostDto');

function getAllBooks(req, res, next) {
  return new Promise((resolve, reject) =>
    // mongo.Book.find().exec()
  //   .then((data) => {
  //     console.log(data);
  //     resolve(res.status(200).json(data));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     reject(err);
  //   });
    Book.findAll({
      include: [
        {
          model: Author,
          required: false,
          attributes: ['firstName', 'lastName'],
        },
      ],
    })
      .then((data) => {
        const extractedBooks = mapper.extractBooksFromResult(data);
        const bookGetDtoList = mapper.getBookDtoList(extractedBooks);
        resolve(res.status(200).json(bookGetDtoList));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      }));
}

function createBook(req, res, next) {
  return new Promise((resolve, reject) => {
    // const newBook = new mongo.Book(req.body);
    // newBook.save()
    //   .then((data) => {
    //     resolve(res.status(201).json(data));
    //   })
    //   .catch((err) => {
    //     reject(err);
    //   });
    let bookPutPostDto = {};
    try {
      bookPutPostDto = new BookPutPostDto(req.body);
    } catch (err) {
      return reject(next(err));
    }

    return Book.create(bookPutPostDto)
      .then((data) => resolve(res.status(201).json(data)))
      .catch((err) => reject(next(err)));
  });
}

function getBookById(req, res, next) {
  return new Promise((resolve, reject) => {
    // mongo.Book.findById(req.params.id).exec()
    //   .then((data) => {
    //     console.log(data);
    //     if (!data) return resolve(res.status(404));
    //     return resolve(res.status(200).json(data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(404).send());
    //   });
    return Book.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Author,
          required: false,
          attributes: ['firstName', 'lastName'],
        },
      ],
    })
      .then((data) => {
        if (data === null) {
          const error = new ResourceNotFoundError('Book');
          reject(next(error));
        }
        const bookGetDto = new BookGetDto(data.dataValues);
        return resolve(res.status(200).json(bookGetDto));
      })
      .catch((err) => {
        console.log(err);
        reject(next(err));
      });
  });
}

function updateBook(req, res, next) {
  return new Promise((resolve, reject) => {
    // mongo.Book.findByIdAndUpdate(req.params.id, req.body)
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    let bookPutPostDto = {};
    try {
      bookPutPostDto = new BookPutPostDto(req.body);
    } catch (err) {
      return reject(next(err));
    }
    return Book.update(bookPutPostDto, {
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data[0] === 0) {
          console.log(data);
          const error = new ResourceNotFoundError('Book');
          return reject(next(error));
        }
        return resolve(res.status(200).json(data));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function deleteBook(req, res, next) {
  return new Promise((resolve, reject) => {
    // mongo.Book.findByIdAndDelete(req.params.id)
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Book.destroy({
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data === 0) {
          const error = new ResourceNotFoundError('Book');
          return reject(next(error));
        }
        return resolve(res.status(200).json(data));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function getBookAuthors(req, res, next) {
  return new Promise((resolve, reject) => {
    Book.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Author,
          required: false,
          attributes: ['firstName', 'lastName'],
        },
      ],
    })
      .then((data) => {
        if (data === null) {
          const error = new ResourceNotFoundError('Book');
          return reject(next(error));
        }

        return resolve(res.status(200).json(data));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function addBookAuthor(req, res, next) {
  return new Promise((resolve, reject) => {
    Book.findOne({
      where: {
        id: req.params.bookId,
      },
    })
      .then((book) => {
        if (book === null) {
          const error = new ResourceNotFoundError('Book');
          reject(next(error));
        }
        book.addAuthor(req.params.authorId);
        return resolve(res.status(200).send('Author added to the book'));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getBookAuthors,
  addBookAuthor,
};
