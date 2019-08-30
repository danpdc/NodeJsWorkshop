const AuthorGetDto = require('../dtos/authorGet');
const MongoService = require('../services/mongoService');
const { Book, Author } = require('../services/sequelizeService');

async function getAllAuthors(req, res, next) {
  try {
    //const result = await MongoService.Author.find().exec();
    const result = await Author.findAll({include: [{model: Book, required: false, attributes: ['title']}]});

    let extractedAuthors = extractAuthorsFromResult(result);

    function extractAuthorsFromResult(persistedAuthorsListRaw) {
      let persistedAuthorList = new Array();
      persistedAuthorsListRaw.forEach(el => {
        persistedAuthorList.push(el.dataValues);
      });

      return persistedAuthorList;
    }

    let authorGetDtoList = getAuthorDtoList(extractedAuthors);

    function getAuthorDtoList(persistedAuthorList) {
      let authorDtoList = new Array();
      persistedAuthorList.forEach(el => {
        authorDtoList.push(new AuthorGetDto(el));
      });
      return authorDtoList;
    }

    return res.status(200).json(authorGetDtoList);
  }
  catch(err) {
    next(err);
  }
}

async function createAuthor(req, res, next) {
  try {
    //const Author = new MongoService.Author(req.body);
    //const result = await Author.save();
    const result = await Author.create(req.body);
    const author = new AuthorGetDto(result.dataValues);
    return res.status(200).json(author);

  }
  catch(err) {
    next(err);
  }
}

async function getAuthorById(req, res, next) {
  try {
    //const result = await MongoService.Author.findById(req.params.id);
    const result = await Author.findOne({
      where: {id: req.params.id},
      include: [{model: Book, required: false, attributes: ['title']}]
    });

    if(result === null) throw new Error(`No author with ID: ${req.params.id} was found in the database`);
    const authorGetDto = new AuthorGetDto(result.dataValues);

    return res.status(200).json(authorGetDto);

  }
  catch(err) {
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    //const result = await MongoService.Author.findByIdAndUpdate(req.params.id, req.body);
    const result = await Author.update(req.body, {where: {id: req.params.id}});
    return res.status(200).send(`Updated records: ${result}`);

  }
  catch(err) {
    next(err);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    //const result = await MongoService.Author.findByIdAndRemove(req.params.id);
    const result = await Author.destroy({where: {id: req.params.id}});
    return res.status(200).send(`Deleted records: ${result}`);
  }
  catch(err) {
    next(err);
  }
}

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor
}
