var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Tuple = require('../../../../cento/kernel/tuple.js');
var LSF = require('../../localStorageFixtures.js');
var CGF = require('./geometry/centoGeometryFixtures.js');
require('../../../../verdoux/predicates.js');

describe('Tuple', function(){
  'use strict';

  var tuple;

  beforeEach(function() {tuple = Tuple.createWithSpec(CGF.Tuple.TupleSpec);});

  it('should be able to be created', function(){assert(existy(tuple));});
  
  it('should retain the given first and second items at creation', function(){
    var firstItem = tuple.first;
    var secondItem = tuple.second;
    existy(firstItem).should.be.true;
    existy(secondItem).should.be.true;
    firstItem.should.equal(CGF.Tuple.FirstItem);
    secondItem.should.equal(CGF.Tuple.SecondItem);
  });

  describe('map', function(){
    it('should call the worker twice, once with firstItem, once more with secondItem', function(){
      var count = 0
        , didSeeFirstItem = false
        , didSeeSecondItem = false;
      var worker = function(input) {

        if (input.first === CGF.Tuple.FirstItem) {
          count++;
          didSeeFirstItem = true;
        }
        if (input.second == CGF.Tuple.SecondItem) {
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

  describe('toString', function(){
    it('should return the contents of the tuple as a string', function(){
      var result = tuple.toString();
      existy(result).should.be.true;

      var expected = '(' + CGF.Tuple.FirstItem + ', ' + CGF.Tuple.SecondItem + ')';
      result.should.equal(expected);
    });
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origTuple = createOrigTuple();

      var data = JSON.stringify(origTuple);
      existy(data).should.be.true;

      var clone = Tuple.createFromJSON(data);
      verifyClone(clone, origTuple);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origTuple = createOrigTuple();
      var data = JSON.stringify(origTuple);

      var lsKey = "TupleSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = Tuple.createFromJSON(rawJSON);
      verifyClone(clone, origTuple);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  var tupleName   = 'TupleSpec.Tuple';
  var tupleFirst  = 'TupleSpec.Tuple.First';
  var tupleSecond = 'TupleSpec.Tuple.Second';
  function createOrigTuple() {
    var origTuple = Tuple.createWithSpec({
      "first":tupleFirst, 
      "second":tupleSecond
    });
    return origTuple;
  };

  function verifyClone(clone, origTuple) {
    existy(clone).should.be.true;
    existy(clone.first).should.be.true;
    existy(clone.second).should.be.true;
  }
});
