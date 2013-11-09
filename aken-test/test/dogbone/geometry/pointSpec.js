var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('./geometryFixtures.js');
var Point = require('../../../../dogbone/geometry/point.js');
require('../../../../verdoux/predicates.js');

describe('Point', function(){
  'use strict';

  var point;
  
  beforeEach(function() {point = Point.create(GF.CoordX, GF.CoordY);});
  
  it('should be able to be created', function(){assert(existy(point));});

  describe('clone', function(){
    it('should correctly clone a Point', function(){
      var clone = point.clone();
      clone.x.should.equal(GF.CoordX);
      clone.y.should.equal(GF.CoordY);
    });
  });

  it('should return the coordinates that were given to it at creation', function(){
    point.x.should.equal(GF.CoordX);
    point.y.should.equal(GF.CoordY);
  });

  describe('translate', function(){
    it('should change the x and y coordinates by the given amount, positive', function(){
      var amount = 5;
      var expected = Point.create(GF.CoordX + amount, GF.CoordY + amount);
      point.translate(amount);
      point.x.should.equal(expected.x);
      point.y.should.equal(expected.y);
    });

    it('should change the x and y coordinates by the given amount, negative', function(){
      var amount = -5;
      var expected = Point.create(GF.CoordX + amount, GF.CoordY + amount);
      point.translate(amount);
      point.x.should.equal(expected.x);
      point.y.should.equal(expected.y);
    });
  });

  describe('moveTo', function(){
    it('should move the point to the given coordinates', function(){
      var x = 123;
      var y = 456;
      point.moveTo(x, y);
      point.x.should.equal(x);
      point.y.should.equal(y);
    });
  });

});
