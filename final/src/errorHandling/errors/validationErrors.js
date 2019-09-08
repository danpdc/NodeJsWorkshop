// Classes for application errors that the application generates
// in certain circumstances
const BaseError = require('./baseError');

class ResourceNotFoundError extends BaseError {
  constructor(resourceType) {
    super(`The ${resourceType} was not found`);
    this.data = { resourceType };
  }
}

class ModelValidationError extends BaseError {
  constructor(resourceName, invalidProperty, reason) {
    super(`Invalid property '"${invalidProperty}" for ${resourceName} reason ${reason}`);
    this.data = { invalidProperty, reason };
  }
}

module.exports = {
  ResourceNotFoundError,
  ModelValidationError,
};
