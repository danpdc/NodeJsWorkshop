const BaseError = require('./baseError');

class InternalError extends BaseError {
  constructor(err, message) {
    super(message);
    this.data = err;
  }
}

module.exports = InternalError;
