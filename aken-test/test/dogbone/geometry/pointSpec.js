require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Point = require('../../../../dogbone/geometry/point.js');

describe('Point', function(){
  'use strict';

  var kCoordX = 11
    , kCoordY = 22;
  var point;
  
  beforeEach(function() {point = Point.create(kCoordX, kCoordY);});
  
  it('should be able to be created', function(){assert(existy(point));});

  it('should return the coordinates that were given to it at creation', function(){
    point.x.should.equal(kCoordX);
    point.y.should.equal(kCoordY);
  });

  describe('translate', function(){
    it('should change the x and y coordinates by the given amount, positive', function(){
      var amount = 5;
      var expected = Point.create(kCoordX + amount, kCoordY + amount);
      point.translate(amount);
      point.x.should.equal(expected.x);
      point.y.should.equal(expected.y);
    });

    it('should change the x and y coordinates by the given amount, negative', function(){
      var amount = -5;
      var expected = Point.create(kCoordX + amount, kCoordY + amount);
      point.translate(amount);
      point.x.should.equal(expected.x);
      point.y.should.equal(expected.y);
    });
  });

});
