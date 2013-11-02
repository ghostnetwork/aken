require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Rectangle = require('../../../../dogbone/geometry/rectangle.js');
var Point = require('../../../../dogbone/geometry/point.js');
var Size = require('../../../../dogbone/geometry/size.js');

describe('Rectangle', function(){
  'use strict';

  var kCoordX = 11
    , kCoordY = 22 
    , kWidth = 111
    , kHeight = 222
    , kOrigin = Point.create(kCoordX, kCoordY)
    , kSize = Size.create(kWidth, kHeight);
  var rectangle;

  beforeEach(function() {rectangle = Rectangle.create(kCoordX, kCoordY, kWidth, kHeight);});

  it('should be able to be created', function(){assert(existy(rectangle));});

  describe('createWithOriginAndSize', function(){
    it('should create a rectangle of the expected origin and size', function(){
      var expectedOrigin = kOrigin;
      rectangle.origin.x.should.equal(expectedOrigin.x);
      rectangle.origin.y.should.equal(expectedOrigin.y);

      var expectedSize = kSize;
      rectangle.size.width.should.equal(expectedSize.width);
      rectangle.size.height.should.equal(expectedSize.height);
    });
  });

  describe('createWithSize', function(){
    it('should create a rectangle of the expected size', function(){
      var expectedSize = kSize;
      rectangle.size.width.should.equal(expectedSize.width);
      rectangle.size.height.should.equal(expectedSize.height);
    });
  });

  describe('contains', function(){
    it('should throw error if given point is notExisty', function(){
      var point;
      (function(){
        var result = rectangle.contains(point);
      }).should.throw();
    });

    it('should return false if the point is not inside the rectangle', function(){
      var pad = 30;
      var point = Point.create(kCoordX - pad, kCoordY - pad);
      var result = rectangle.contains(point);
      result.should.be.false;

      point = Point.create(kWidth + pad, kHeight + pad);
      result = rectangle.contains(point);
      result.should.be.false;
    });

    it('should return true if the point is inside the rectangle', function(){
      var pad = 30;
      var point = Point.create(kCoordX + pad, kCoordY + pad);
      var result = rectangle.contains(point);
      result.should.be.true;

      point = Point.create(kWidth - pad, kHeight - pad);
      result = rectangle.contains(point);
      result.should.be.true;
    });
  });

  describe('growBy', function(){
    it('should move the origin by the given amount', function(){
      var amount = 30;
      var expected = Point.create(rectangle.origin.x, rectangle.origin.y);
      expected.translate(-amount);

      rectangle.growBy(amount);
      rectangle.origin.x.should.equal(expected.x);
      rectangle.origin.y.should.equal(expected.y);
    });

    it('should increase the size by the given amount', function(){
      var amount = 30;
      var expected = Size.create(rectangle.size.width, rectangle.size.height);
      expected.growBy(amount);

      rectangle.growBy(amount);
      rectangle.size.width.should.equal(expected.width);
      rectangle.size.height.should.equal(expected.height);
    });
  });

  describe('shrinkBy', function(){
    it('should move the origin by the given amount', function(){
      var amount = 30;
      var expected = Point.create(rectangle.origin.x, rectangle.origin.y);
      expected.translate(amount);

      rectangle.shrinkBy(amount);
      rectangle.origin.x.should.equal(expected.x);
      rectangle.origin.y.should.equal(expected.y);
    });

    it('should decrease the size by the given amount', function(){
      var amount = 30;
      var expected = Size.create(rectangle.size.width, rectangle.size.height);
      expected.shrinkBy(amount);

      rectangle.shrinkBy(amount);
      rectangle.size.width.should.equal(expected.width);
      rectangle.size.height.should.equal(expected.height);
    });
  });

});
