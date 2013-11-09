var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('../geometry/geometryFixtures.js');
var Rectangle = require('../../../../dogbone/geometry/rectangle.js');
var Size = require('../../../../dogbone/geometry/size.js');
var ViewBuilder = require('../../../../dogbone/views/viewbuilder.js');
var View = require('../../../../dogbone/views/view.js');
require('../../../../verdoux/predicates.js');

describe('ViewBuilder', function(){
  'use strict';

  var kViewName = "ViewBuilderSpec.View.Name";
  var viewbuilder;

  describe('View.fromRectangle', function(){
    it('should be able to create a view using the given frame', function(){
      var frame = GF.Frame.clone();
      var view = ViewBuilder.View.fromRectangle(frame);
      var actual = view.frame.clone();
      verifyViewFrame(actual, frame);
    });
  });

  describe('squareView', function(){
    it('should be able to create a square view', function(){
      var view = ViewBuilder.SquareView.create(GF.Origin, GF.Width, GF.RGBColorString, GF.Alpha);
      var actual = view.frame;
      var expected = Rectangle.createWithOriginAndSize(GF.Origin, Size.create(GF.Width, GF.Width));
      verifyViewFrame(actual, expected);
    });
  });

  describe('squareViewFromSpec', function(){
    it('should be able to create a square view from the given spec', function(){
      var spec = {
        "name":kViewName,
        "origin":GF.Origin.clone(),
        "width":GF.Width,
        "rgbColorString":GF.RGBColorString,
        "alpha":GF.alpha,
      };
      var view = ViewBuilder.SquareView.fromSpec(spec);
      var actual = view.frame;
      var expected = Rectangle.createWithOriginAndSize(GF.Origin, Size.create(GF.Width, GF.Width));
      verifyViewFrame(actual, expected);
    });
  });

  function verifyViewFrame(actual, expected) {
      actual.origin.x.should.equal(expected.origin.x);
      actual.origin.y.should.equal(expected.origin.y);
      actual.size.width.should.equal(expected.size.width);
      actual.size.height.should.equal(expected.size.height);
  }
});
