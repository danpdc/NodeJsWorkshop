
const BookPutPostDto = require('../../src/dtos/bookPutPost');
const assert = require('assert');
const should = require('chai').should();
const expect = require('chai').expect;
const {ModelValidationError} = require('../../src/errorHandling/errors/validationErrors');

describe('BookPutPostDto', function() {
  describe('Constructor', function() {
    it('Should return a BookGetDto', function() {
      let body = {
        title: "Homo Deus",
        yearPublished: 2004,
        ISBN: "7890743273500",
        copies: 50,
        publisher: "Curtea veche"
      }
      let bookPutPostDto = new BookPutPostDto(body);
      bookPutPostDto.should.have.property('title').equal('Homo Deus');
      bookPutPostDto.should.have.property('yearPublished').equal(2004);
      bookPutPostDto.should.have.property('ISBN').equal('7890743273500');
    });

    it('Should return property \"copies\" as \"0\"', function() {
      let body = {
        title: "Homo Deus",
        yearPublished: 2004,
        ISBN: "7890743273500",
        publisher: "Curtea veche"
      }
      let bookPutPostDto = new BookPutPostDto(body);
      bookPutPostDto.should.have.property('copies').equal(0);
    });

    it('Should return yearPublished, ISBN and publisher as null', function() {
      let body = {
        title: "Homo Deus",
        copies: 15,
      }
      let bookPutPostDto = new BookPutPostDto(body);

      bookPutPostDto.should.have.property('yearPublished').equal(null);
      bookPutPostDto.should.have.property('ISBN').equal(null);
      bookPutPostDto.should.have.property('publisher').equal(null);
    });

    it('Should return a ModelValidationError if title is not defined', function() {
      let body = {
        yearPublished: 2004,
        ISBN: "7890743273500",
        publisher: "Curtea veche"
      }
      expect(() => new BookPutPostDto(body)).to.throw().to.be.instanceOf(ModelValidationError);
    });

  });
});
