const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');
const controller = require('../../src/controllers/bookController');
const { Book } = require('../../src/services/sqlService');
const { ModelValidationError, ResourceNotFoundError } = require('../../src/errorHandling/errors/validationErrors');


const { expect } = chai;
const should = chai.should();

// Dummy tests
describe('Dummy test', () => {
  it('Result should have a property called title', () => {
    const result = { title: 'Some title' };
    result.should.have.property('title');
  });
  it('Result should not have a title property', () => {
    const result = {};
    result.should.not.have.property('title');
  });
});

// Book controller tests
describe('Book Controller tests', () => {
  describe('When getAllBooks gets called', () => {
    const req = {};
    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = (data) => data;
      return res;
    };
    const res = mockResponse();
    const next = () => { };

    const dbStub = sinon.stub(Book, 'findAll').resolves([{
      dataValues: {
        id: 1,
        title: '100 Years Of Solitude',
        ISBN: '789456123',
        availableCopies: 15,
        authors: [],
      },
    }]);

    it('Should return status 200', () => controller.getAllBooks(req, res, next)
      .then((data) => {
        expect(dbStub).to.have.property('called').equal(true);
        expect(res.status.calledWith(200));
      }));

    it('Returned body array should have length greater than 0', () => controller.getAllBooks(req, res, next)
      .then((data) => {
        expect(dbStub).to.have.property('called').equal(true);
        expect(data).to.have.property('length').greaterThan(0);
      }));
  });

  describe('When createBooks gets called', () => {
    const req = {};
    req.body = {
      yearPublished: 2019,
      copies: 10,
      ISBN: 789456,
    };
    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = (data) => data;
      return res;
    };
    const res = mockResponse();
    const next = sinon.spy();

    it('Should return ModelValidationError', () => {
      controller.createBook(req, res, next)
        .then()
        .catch((err) => {
          expect(next.calledWith(ModelValidationError));
        });
    });
  });
});
