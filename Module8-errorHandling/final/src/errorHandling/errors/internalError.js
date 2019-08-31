const BaseError = require('./BaseError');

class InternalError extends BaseError {
  constructor(error, message) {
    super(message);
    this.data = { message, error };
  }
}

module.exports = InternalError;
