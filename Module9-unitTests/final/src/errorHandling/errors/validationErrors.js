const BaseError = require('./BaseError');

class ResourceNotFoundError extends BaseError {
  constructor(resourceType) {
    super(`The ${resourceType} was not found`);
    this.data = { resourceType };
  }
}

class ModelValidationError extends BaseError {
  constructor(resource, resourceName, invalidProperty, reason) {
    super(`Invalid property ${invalidProperty} for \'${resourceName}\' resource. ${reason}`);
    this.data = { resource, invalidProperty, reason };
  }
}

module.exports = {
  ResourceNotFoundError,
  ModelValidationError,
};
