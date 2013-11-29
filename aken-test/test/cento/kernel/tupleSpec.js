var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Tuple = require('../../../../cento/kernel/tuple.js');
require('../../../../verdoux/predicates.js');

describe('Tuple', function(){
  'use strict';

  var kFirstItem = 'TupleSpec.Item.First'
    , kSecondItem = 'TupleSpec.Item.Second'
    , kSpec = {"first":kFirstItem, "second":kSecondItem};
  var tuple;

  beforeEach(function() {tuple = Tuple.createWithSpec(kSpec);});

  it('should be able to be created', function(){assert(existy(tuple));});
  
  it('should retain the given first and second items at creation', function(){
    var firstItem = tuple.first;
    var secondItem = tuple.second;
    existy(firstItem).should.be.true;
    existy(secondItem).should.be.true;
    firstItem.should.equal(kFirstItem);
    secondItem.should.equal(kSecondItem);
  });

  describe('create', function(){
    it('should be able to create a tuple given separate first and second items', function(){
      var myFirstItem = 'My.First.Item';
      var mySecondItem = 'My.Second.Item';
      var myTuple = Tuple.create(myFirstItem, mySecondItem);
      var firstItem = myTuple.first;
      var secondItem = myTuple.second;
      existy(firstItem).should.be.true;
      existy(secondItem).should.be.true;
      firstItem.should.equal(myFirstItem);
      secondItem.should.equal(mySecondItem);
    });
  });

  describe('map', function(){
    it('should call the worker twice, once with firstItem, once more with secondItem', function(){
      var count = 0
        , didSeeFirstItem = false
        , didSeeSecondItem = false;
      var worker = function(input) {

        if (input.first === kFirstItem) {
          count++;
          didSeeFirstItem = true;
        }
        if (input.second == kSecondItem) {
          count++;
          didSeeSecondItem = true;
        }
      };

      tuple.map(worker);

      count.should.equal(2);
      didSeeFirstItem.should.be.true;
      didSeeSecondItem.should.be.true;
    });
  });
});
