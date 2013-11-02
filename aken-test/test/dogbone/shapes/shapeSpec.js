require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Shape = require('../../../../dogbone/shapes/shape.js');
var Rectangle = require('../../../../dogbone/geometry/rectangle.js');
var Point = require('../../../../dogbone/geometry/point.js');
var Size = require('../../../../dogbone/geometry/size.js');

describe('Shape', function(){
  'use strict';

  var shape
    , kCoordX = 11
    , kCoordY = 22 
    , kWidth = 111
    , kHeight = 222
    , kOrigin = Point.create(kCoordX, kCoordY)
    , kSize = Size.create(kWidth, kHeight)
    , kFrame = Rectangle.createWithOriginAndSize(kOrigin, kSize);

  beforeEach(function() {shape = Shape.create(kFrame);});

  it('should be able to be created', function(){assert(existy(shape));});

  it('should have a frame of the same dimensions as the one given at construction', function(){
    var expected = Rectangle.createWithOriginAndSize(kOrigin, kSize);
    shape.frame.x.should.equal(expected.x);
    shape.frame.y.should.equal(expected.y);
    shape.frame.size.width.should.equal(expected.width);
    shape.frame.size.height.should.equal(expected.height);
  });

  describe('hitTest', function(){
    it('should return true if the given point is within shape.frame', function(){
      var point = Point.create(kOrigin.x, kOrigin.y);
      var amount = 5;
      point.translate(amount);
      var result = shape.hitTest(point);
      result.should.be.true;

      point = Point.create(kOrigin.x + kSize.width, kOrigin.y + kSize.height);
      point.translate(-amount);
      result = shape.hitTest(point);
      result.should.be.true;
    });

    it('should return false if the given point is not within shape.frame', function(){
      var point = Point.create(kOrigin.x, kOrigin.y);
      var amount = -5;
      point.translate(amount);
      var result = shape.hitTest(point);
      result.should.be.false;

      point = Point.create(kOrigin.x + kSize.width, kOrigin.y + kSize.height);
      point.translate(-amount);
      result = shape.hitTest(point);
      result.should.be.false;
    });
  });
});
