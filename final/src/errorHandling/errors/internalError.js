// Internal error class
// Used to throw errors we don't expect
const BaseError = require('./baseError');

class InternalError extends BaseError {
  constructor(err, message) {
    super(message);
    this.data = err;
  }
}

module.exports = InternalError;
