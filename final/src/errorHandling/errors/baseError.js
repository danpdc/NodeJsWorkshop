// Base error class for our application
// We want to capture the stack trace and the time when the error was generated
class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.timeUtc = new Date();
  }
}

module.exports = BaseError;
