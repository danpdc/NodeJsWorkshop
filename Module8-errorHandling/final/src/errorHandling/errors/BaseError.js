
class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.timeUtc = new Date();
    this.errorMsg = message;
  }
}

module.exports = BaseError;
