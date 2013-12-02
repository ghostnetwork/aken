var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Tuple = require('../../../../cento/kernel/tuple.js');
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
});
