var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var GF = require('../geometry/geometryFixtures.js');
var View = require('../../../../dogbone/views/view.js');
var Point = require('../../../../dogbone/geometry/point.js');
var Size = require('../../../../dogbone/geometry/size.js');
var Rectangle = require('../../../../dogbone/geometry/rectangle.js');
require('../../../../verdoux/predicates.js');

describe('View', function(){
  'use strict';

  var kCoordX = 11
    , kCoordY = 22 
    , kWidth = 111
    , kHeight = 222
    , kOrigin = Point.create(kCoordX, kCoordY)
    , kSize = Size.create(kWidth, kHeight)
    , kFrame = Rectangle.createWithOriginAndSize(kOrigin, kSize);
  var view;

  beforeEach(function() {view = View.create(GF.Frame);});

  it('should be able to be created', function(){assert(existy(view));});

  describe('addChild', function(){
    it('should ignore if given child is notExisty', function(){
      var child;
      view.addChild(child);
      var actual = view.childCount;
      actual.should.equal(0);
    });

    it('should add the child to the displayList', function(){
      var child = View.create();
      view.addChild(child);

      var actual = view.childCount;
      actual.should.equal(1);
    });
  });

  describe('removeChild', function(){
    it('should ignore if given child is notExisty', function(){
      var child;
      view.removeChild(child);
      var actual = view.childCount;
      actual.should.equal(0);

      child = View.create();
      view.addChild(child);

      view.removeChild();
      actual = view.childCount;
      actual.should.equal(1);
    });

    it('should remove the child if it is in the displayList', function(){
      var child = View.create();
      view.addChild(child);

      view.removeChild(child);
      var actual = view.childCount;
      actual.should.equal(0);
    });

    it('should not remove the child if it is not in the displayList', function(){
      var firstChild = View.create();
      view.addChild(firstChild);

      var secondChild = View.create();
      view.addChild(secondChild);

      var expected = view.childCount;

      var child = View.create();
      view.removeChild(child);
      var actual = view.childCount;
      actual.should.equal(expected);
    });
  });

  describe('hitTest', function(){
    it('should not throw error if point or handler is notExisty, empty list', function(){
      (function(){
        var point;
        var handler;
        view.hitTest(point, handler);
      }).should.throw();
    });

    it('should not throw error if point or handler is notExisty, non-empty list', function(){
      (function(){
        var child = View.create();
        view.addChild(child);
        view.childCount.should.equal(1);

        var point;
        var handler;
        view.hitTest(point, handler);

      }).should.throw();
    });

    it('should not call handler if point is not within view', function(){
      console.log('\n');

      var child = View.create(kFrame);
      view.addChild(child);
      view.childCount.should.equal(1);

      var point = Point.create(kCoordX, kCoordY);
      point.translate(-1);

      var handlerWasCalled = false;
      view.hitTest(point, function(shape) {handlerWasCalled = true;});
      handlerWasCalled.should.be.false;
    });

    it('should call handler if point is within view', function(){
      var child = View.create(kFrame);
      view.addChild(child);
      view.childCount.should.equal(1);

      var point = Point.create(kCoordX, kCoordY);
      var handlerWasCalled = false;
      view.frameContainsPoint(point, function(shape) {handlerWasCalled = true;});
      handlerWasCalled.should.be.true;
    });
  });

  describe('moveTo', function(){
    it('should move the view to the specified point', function(){
      var destinationPoint = Point.create(222, 333);
      view.moveTo(destinationPoint.x, destinationPoint.y);
      view.frame.origin.x.should.equal(destinationPoint.x);
      view.frame.origin.y.should.equal(destinationPoint.y);
    });
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origView = createOriginalView();

      var data = View.toJSON(origView);
      existy(data).should.be.true;

      var clone = View.createFromJSON(data);
      verifyClone(clone, origView);
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origView = createOriginalView();

      var data = View.toJSON(origView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = View.createFromJSON(rawJSON);
      verifyClone(clone, origView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  var bgColorFixture = '#dead00'
    , highlightBgColorFixture = '#deffed'
    , borderColorFixture = '#ffeedd'
    , clearBorderColorFixture = '#ccbbaa'
    , zOrderFixture = 54321
    , labelFixture = 'View.Label'
    , childViewAlpha = createChildView("Alpha")
    , childViewBeta = createChildView("Beta")
    , origChildViewCount;

  function createOriginalView() {
    var origView = View.create(GF.Frame);
    origView.backgroundColor = bgColorFixture;
    origView.highlightBgColor = highlightBgColorFixture;
    origView.borderColor = borderColorFixture;
    origView.clearBorderColor = clearBorderColorFixture;
    origView.zOrder = zOrderFixture;
    origView.label = labelFixture;
    origView.addChild(childViewAlpha);
    origView.addChild(childViewBeta);
    origChildViewCount = origView.childCount;
    return origView;
  }

  function createChildView(id) {
    var frame = GF.Frame.clone();
    frame.shrinkBy(75);
    var childView = View.create(frame);
    childView.label = "ViewSpec.ChildView." + id;
    return childView;
  }

  function verifyClone(clone, origView) {
    existy(clone).should.be.true;
    
    clone.frame.debugString().should.equal(origView.frame.debugString());
    clone.bounds.debugString().should.equal(origView.bounds.debugString());
    clone.isDraggable.should.equal(origView.isDraggable);
    clone.isSelected.should.equal(origView.isSelected);
    clone.isSelectable.should.equal(origView.isSelectable);

    clone.backgroundColor.should.equal(bgColorFixture);
    clone.highlightBgColor.should.equal(highlightBgColorFixture);
    clone.zOrder.should.equal(zOrderFixture);
    clone.label.should.equal(labelFixture);

    clone.childCount.should.equal(origChildViewCount);
  }
});
