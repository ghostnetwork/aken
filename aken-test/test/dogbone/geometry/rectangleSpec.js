var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('./geometryFixtures.js');
var Rectangle = require('../../../../dogbone/geometry/rectangle.js');
var Point = require('../../../../dogbone/geometry/point.js');
var Size = require('../../../../dogbone/geometry/size.js');
require('../../../../verdoux/predicates.js');

describe('Rectangle', function(){
  'use strict';

  var rectangle;

  beforeEach(function() {rectangle = Rectangle.create(GF.CoordX, GF.CoordY, GF.Width, GF.Height);});

  it('should be able to be created', function(){assert(existy(rectangle));});

  describe('create', function(){
    it('should adjust the origin if width is negative', function(){
      var width = GF.Width * -1;
      var height = GF.Height;
    });
  });
  describe('createWithOriginAndSize', function(){
    it('should create a rectangle of the expected origin and size', function(){
      var expectedOrigin = GF.Origin;
      rectangle.origin.x.should.equal(expectedOrigin.x);
      rectangle.origin.y.should.equal(expectedOrigin.y);

      var expectedSize = GF.Size;
      rectangle.size.width.should.equal(expectedSize.width);
      rectangle.size.height.should.equal(expectedSize.height);
    });
  });

  describe('createWithSize', function(){
    it('should create a rectangle of the expected size', function(){
      var expectedSize = GF.Size;
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
      var point = Point.create(GF.CoordX - pad, GF.CoordY - pad);
      var result = rectangle.contains(point);
      result.should.be.false;

      point = Point.create(GF.Width + pad, GF.Height + pad);
      result = rectangle.contains(point);
      result.should.be.false;
    });

    it('should return true if the point is inside the rectangle', function(){
      var pad = 30;
      var point = Point.create(GF.CoordX + pad, GF.CoordY + pad);
      var result = rectangle.contains(point);
      result.should.be.true;

      point = Point.create(GF.Width - pad, GF.Height - pad);
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

  describe('center', function(){
    it('should return the center of the rectangle', function(){
      var center = rectangle.center;
      existy(center).should.be.true;
      Math.floor(center.x).should.equal(66);
      Math.floor(center.y).should.equal(133);
    });
  });

  describe('jsonString', function(){
    it('should return a non-empty JSON string', function(){
      var rectJSON = rectangle.jsonString();
      existy(rectJSON).should.be.true;
    });
  });

  describe('createFromJSON', function(){
    it('should create a rectangle using the given JSON string', function(){
      testRectangleFromJSON(rectangle, Rectangle.createFromJSON);
    });
  });

  describe('makeRectangleFromJSON', function(){
    it('should create a rectangle from the given JSON string', function(){
      testRectangleFromJSON(rectangle, makeRectangleFromJSON);
    });
  });
 
  describe('intersect', function(){
    it('should return true if the other rectangle intersects the other rectangle', function(){
      var rectA = Rectangle.create(10, 10, 30, 30);
      var rectB = Rectangle.create(20, 20, 50, 50);
      var result = rectA.intersect(rectB);
      result.should.be.true;
    });
 
    it('should return true if the other rectangle intersects the other rectangle', function(){
      var rectA = Rectangle.create(10, 10, 30, 30);
      var rectC = Rectangle.create(70, 70, 90, 90);
      var result = rectA.intersect(rectC);
      result.should.be.false;
    });
  });

  function testRectangleFromJSON(sourceRect, rectMaker) {
    var rectJSON = sourceRect.jsonString();
    existy(rectJSON).should.be.true;

    var result = rectMaker(rectJSON);
    existy(result).should.be.true;
    result.origin.x.should.equal(rectangle.origin.x);
    result.origin.y.should.equal(rectangle.origin.y);
    result.size.width.should.equal(rectangle.size.width);
    result.size.height.should.equal(rectangle.size.height);
  }
});
