var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Tuple = require('../../../../cento/kernel/tuple.js');
var CentoMath = require('../../../../cento/system/centoMath.js');
require('../../../../verdoux/predicates.js');

describe('CentoMath', function(){
  'use strict';

  describe('plus', function(){
    it('should be able to add two items', function(){
      var firstItem = 2;
      var secondItem = 3;
      var expected = firstItem + secondItem;
      var result = CentoMath.plus(Tuple.create(firstItem, secondItem));
      existy(result).should.be.true;
      result.should.equal(expected);
    });
  });

  describe('minus', function(){
    it('should be able to add two items', function(){
      var firstItem = 2;
      var secondItem = 3;
      var expected = firstItem - secondItem;
      var result = CentoMath.minus(Tuple.create(firstItem, secondItem));
      existy(result).should.be.true;
      result.should.equal(expected);
    });
  });

  describe('multiply', function(){
    it('should be able to add two items', function(){
      var firstItem = 2;
      var secondItem = 3;
      var expected = firstItem * secondItem;
      var result = CentoMath.multiply(Tuple.create(firstItem, secondItem));
      existy(result).should.be.true;
      result.should.equal(expected);
    });
  });

  describe('divide', function(){
    it('should be able to add two items', function(){
      var firstItem = 2;
      var secondItem = 3;
      var expected = firstItem / secondItem;
      var result = CentoMath.divide(Tuple.create(firstItem, secondItem));
      existy(result).should.be.true;
      result.should.equal(expected);
    });
  });
});
