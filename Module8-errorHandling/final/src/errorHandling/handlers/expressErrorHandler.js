const {ModelValidationError, ResourceNotFoundError} = require('../errors/validationErrors');
const InternalError = require('../errors/internalError');

function handleErrors(err, req, res, next) {

  switch(err) {
    case err instanceof ModelValidationError:
        return res.status(406).json(err);
    case err instanceof ResourceNotFoundError:
        return res.status(404).json(err);
    default:
        const internalError = new InternalError(err, err.message);
        res.status(500).json(internalError);
        return;
  }
}

module.exports = handleErrors;
