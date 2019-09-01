const bookMapper = require('../../src/mappers/bookMapper');
const assert = require('assert');
const should = require('chai').should();
const expect = require('chai').expect;

describe('BookMapper', function() {
  it('Should extract books from the raw database data', function() {
    const rawData = [
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
    ];

    const result = bookMapper.extractBooksFromResult(rawData);
    expect(result).to.have.property('length').equal(1);
    expect(result[0]).to.have.property('title').equal('Homo Deus');
    expect(result[0]).to.have.property('authors').length(1);
    expect(result[0].authors[0]).to.have.property('firstName').equal('Noah');
    expect(result[0].authors[0]).to.have.property('lastName').equal('Harari');

  });

  it('Should convert books from the database in BookGetDto', function() {
    const bookList = [
      {
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
    ]

    const result = bookMapper.getBookDtoList(bookList);
    expect(result).to.have.property('length').equal(1);
    expect(result[0]).to.have.property('title').equal('Homo Deus');
    expect(result[0]).to.have.property('authors').length(1);
    expect(result[0].authors[0]).to.have.property('name').equal('Noah Harari');
  });

});
