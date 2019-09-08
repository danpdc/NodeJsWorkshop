const mongo = require('../services/mongoService');
const { Book, Author } = require('../services/sqlService');

function getAllBooks(req, res) {
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
    .then((data) => (res.status(200).json(data)))
    .catch((err) => (res.status(500).send(err)));
}

function createBook(req, res) {
  return new Promise((resolve, reject) => {
    // const newBook = new mongo.Book(req.body);
    // newBook.save()
    //   .then((data) => {
    //     resolve(res.status(201).json(data));
    //   })
    //   .catch((err) => {
    //     reject(err);
    //   });
    Book.create(req.body)
      .then((data) => resolve(res.status(201).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  });
}

function getBookById(req, res) {
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
    Book.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Author,
          required: false,
          attributes: ['firstName', 'lastName'],
        },
      ],
    })
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  });
}

function updateBook(req, res) {
  return new Promise((resolve, reject) => {
    // mongo.Book.findByIdAndUpdate(req.params.id, req.body)
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Book.update(req.body, {
      where: { id: req.params.id },
    })
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  });
}

function deleteBook(req, res) {
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
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  });
}

function getBookAuthors(req, res) {
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
      .then((data) => resolve(res.status(200).json(data.authors)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  });
}

function addBookAuthor(req, res) {
  return new Promise((resolve, reject) => {
    Book.findOne({
      where: {
        id: req.params.bookId,
      },
    })
      .then((book) => {
        book.addAuthor(req.params.authorId);
        return resolve(res.status(200).send('Author added to the book'));
      })
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send('Author not added'));
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
