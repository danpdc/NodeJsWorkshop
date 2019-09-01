const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const controller = require('../../src/controllers/bookController');
const sinon = require('sinon');
const { Book, Author } = require('../../src/services/sequelizeService');
const httpMocks = require('node-mocks-http');
const { ResourceNotFoundError, ModelValidationError } = require('../../src/errorHandling/errors/validationErrors');

chai.use(chaiAsPromised);
const should = chai.should();

describe('BookController', function () {
  this.timeout(5000);
  describe('When getAllBooks gets called ', function () {

    it('Should return a 200 response', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/books'
      });

      const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        return res;
      };
      const res = mockResponse();
      const next = () => { };

      const dbStub = sinon.stub(Book, 'findAll').resolves([
        {
          dataValues: {
            id: 1,
            title: "Homo Deus",
            yearPublished: 2004,
            ISBN: 789456123,
            copies: 14,
            publisher: "Polirom",
            authors: [
              {
                firstName: "Noah",
                lastName: 'Harari'
              }
            ]
          }
        }
      ]);

      return controller.getAllBooks(req, res, next)
        .then(data => {
          console.log(JSON.stringify(data));
          expect(dbStub).to.have.property('called').equal(true);
          expect(res.status.calledWith(200));
          expect(res.json.calledWith(JSON));
        });

    });


  });

  describe('When createBook gets called', function() {
    it('Should return status 201 and a book as JSON', async function() {
      const req = httpMocks.createRequest();
      req.body = {
        title: "Homo Deus",
            yearPublished: 2004,
            ISBN: 789456123,
            copies: 14,
            publisher: "Polirom"
      }
      const res = {};
      res.statusCode = 0
      res.body = {};
      res.status = (code) => {
        res.statusCode = code;
        return res;
      }
      res.json = (json) => {
        res.body  = json;
        return res;
      }

      const next = () => { };

      const dataStub = sinon.stub(Book, 'create').resolves({
        dataValues: {
          id: 2,
          title: "Homo Deus",
          yearPublished: 2004,
          ISBN: 789456123,
          copies: 14,
          publisher: "Polirom"
        }
      });

      return controller.createBook(req, res, next)
        .then(data => {
          //console.log(data);
          expect(dataStub.calledWith(req.body));
          expect(res).to.have.property('statusCode').equal(201);
          expect(res).to.have.property('body').to.deep.equal({
            id: 2,
            title: "Homo Deus",
            yearPublished: 2004,
            ISBN: 789456123,
            copies: 14,
            publisher: "Polirom"
          });
        });

    });

    it('Should return a ModelValidation error if title is missing from body', function() {
      const req = httpMocks.createRequest();
      req.body = {
        title: "Homo Deus",
            yearPublished: 2004,
            ISBN: 789456123,
            copies: 14,
            publisher: "Polirom"
      }
      const res = {};
      res.statusCode = 0
      res.body = {};
      res.status = (code) => {
        res.statusCode = code;
        return res;
      }
      res.json = (json) => {
        res.body  = json;
        return res;
      }

      const next = sinon.stub();
      controller.createBook(req, res, next)
        .then();

      expect(next.calledWith(ModelValidationError));

    });
  });
});
