// Express error handler

const { ResourceNotFoundError, ModelValidationError } = require('../errors/validationErrors');
const InternalError = require('../errors/internalError');

function handleErrors(err, req, res, next) {
  switch (true) {
    case err instanceof ResourceNotFoundError:
      return res.status(404).json(err);
    case err instanceof ModelValidationError:
      return res.status(406).json(err);
    default: {
      const internalError = new InternalError(err, err.message);
      return res.status(500).json(internalError);
    }
  }
}

module.exports = handleErrors;
