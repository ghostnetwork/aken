var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GeometryFixtures = require('./geometryFixtures.js');
var Size = require('../../../../dogbone/geometry/size.js');

describe('Size', function(){
  'use strict';

  var size;

  beforeEach(function() {size = Size.create(GeometryFixtures.Width, GeometryFixtures.Height);});

  it('should be able to be created', function(){assert(existy(size));});

  it('should return the width and height given to it at creation', function(){
    size.width.should.equal(GeometryFixtures.Width);
    size.height.should.equal(GeometryFixtures.Height);
  });

  describe('clone', function(){
    it('should correctly clone a Point', function(){
      var clone = size.clone();
      clone.width.should.equal(GeometryFixtures.Width);
      clone.height.should.equal(GeometryFixtures.Height);
    });
  });

  describe('growBy', function(){
    it('should increase the size by the given amount', function(){
      var amount = 33;
      size.growBy(amount);

      var expected = Size.create(GeometryFixtures.Width + amount, GeometryFixtures.Height + amount);
      size.width.should.equal(expected.width);
      size.height.should.equal(expected.height);
    });
  });

  describe('shrinkBy', function(){
    it('should decrease the size by the given amount', function(){
      var amount = 33;
      size.shrinkBy(amount);

      var expected = Size.create(GeometryFixtures.Width - amount, GeometryFixtures.Height - amount);
      size.width.should.equal(expected.width);
      size.height.should.equal(expected.height);
    });
  });

});
