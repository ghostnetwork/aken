var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Size = require('../../../../dogbone/geometry/size.js');

describe('Size', function(){
  'use strict';

  var kWidth = 111
    , kHeight = 222;
  var size;

  beforeEach(function() {size = Size.create(kWidth, kHeight);});

  it('should be able to be created', function(){assert(existy(size));});

  it('should return the width and height given to it at creation', function(){
    size.width.should.equal(kWidth);
    size.height.should.equal(kHeight);
  });

  describe('growBy', function(){
    it('should increase the size by the given amount', function(){
      var amount = 33;
      size.growBy(amount);

      var expected = Size.create(kWidth + amount, kHeight + amount);
      size.width.should.equal(expected.width);
      size.height.should.equal(expected.height);
    });
  });

  describe('shrinkBy', function(){
    it('should decrease the size by the given amount', function(){
      var amount = 33;
      size.shrinkBy(amount);

      var expected = Size.create(kWidth - amount, kHeight - amount);
      size.width.should.equal(expected.width);
      size.height.should.equal(expected.height);
    });
  });

});
