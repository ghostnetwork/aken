var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var GF = require('../geometry/geometryFixtures.js');
var Shape = require('../../../../dogbone/shapes/shape.js');
var Rectangle = require('../../../../dogbone/geometry/rectangle.js');
var Point = require('../../../../dogbone/geometry/point.js');
var Size = require('../../../../dogbone/geometry/size.js');
require('../../../../verdoux/predicates.js');

describe('Shape', function(){
  'use strict';

  var shape;

  beforeEach(function() {shape = Shape.create(GF.Frame);});

  describe('construction', function(){
    it('should be able to be created', function(){assert(existy(shape));});

    it('should have a frame of the same dimensions as the one given at construction', function(){
      var expected = Rectangle.createWithOriginAndSize(GF.Origin, GF.Size);
      shape.frame.x.should.equal(expected.x);
      shape.frame.y.should.equal(expected.y);
      shape.frame.size.width.should.equal(expected.width);
      shape.frame.size.height.should.equal(expected.height);
    });
  });

  describe('hitTest', function(){
    it('should return true if the given point is within shape.frame', function(){
      var point = Point.create(GF.Origin.x, GF.Origin.y);
      var amount = 5;
      point.translate(amount);
      var result = shape.hitTest(point);
      result.should.be.true;

      point = Point.create(GF.Origin.x + GF.Size.width
                         , GF.Origin.y + GF.Size.height);
      point.translate(-amount);
      result = shape.hitTest(point);
      result.should.be.true;
    });

    it('should return false if the given point is not within shape.frame', function(){
      var point = Point.create(GF.Origin.x, GF.Origin.y);
      var amount = -5;
      point.translate(amount);
      var result = shape.hitTest(point);
      result.should.be.false;

      point = Point.create(GF.Origin.x + GF.Size.width
                         , GF.Origin.y + GF.Size.height);
      point.translate(-amount);
      result = shape.hitTest(point);
      result.should.be.false;
    });
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origShape = createOriginalShape();

      var data = JSON.stringify(origShape);
      existy(data).should.be.true;

      var clone = Shape.createFromJSON(data);
      verifyClone(clone, origShape);
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origShape = createOriginalShape();

      var data = JSON.stringify(origShape);
      existy(data).should.be.true;

      var lsKey = "ShapeSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = Shape.createFromJSON(rawJSON);
      verifyClone(clone, origShape);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  var colorFixture = '#ffeedd';
  var highlightColorFixture = '#aabbcc';
  var zOrderFixture = 12345;
  var labelFixture = 'Shape.Foo';

  function createOriginalShape() {
    var origShape = Shape.create(GF.Frame);
    origShape.makeUndraggable();
    origShape.select();
    origShape.makeUnselectable();
    origShape.backgroundColor = colorFixture;
    origShape.highlightBgColor = highlightColorFixture;
    origShape.zOrder = zOrderFixture;
    origShape.label = labelFixture;
    return origShape;
  }

  function verifyClone(clone, origShape) {
    existy(clone).should.be.true;
    
    clone.frame.debugString().should.equal(origShape.frame.debugString());
    clone.bounds.debugString().should.equal(origShape.bounds.debugString());
    clone.isDraggable.should.equal(origShape.isDraggable);
    clone.isSelected.should.equal(origShape.isSelected);
    clone.isSelectable.should.equal(origShape.isSelectable);

    clone.backgroundColor.should.equal(colorFixture);
    clone.highlightBgColor.should.equal(highlightColorFixture);
    clone.zOrder.should.equal(zOrderFixture);
    clone.label.should.equal(labelFixture);
  }
});
