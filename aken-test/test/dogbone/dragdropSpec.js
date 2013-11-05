var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var DragDrop = require('../../../dogbone/dragdrop.js');
var Rectangle = require('../../../dogbone/geometry/rectangle.js');
var View = require('../../../dogbone/views/view.js');
require('../../../verdoux/predicates.js');

describe('DragDrop', function(){
  'use strict';

  var dragdrop;

  beforeEach(function() {dragdrop = DragDrop.create();});

  it('should be able to be created', function(){assert(existy(dragdrop));});
  
  describe('registerDropTarget', function(){
    it('should increment the number of drop targets', function(){
      var frame = Rectangle.create(0, 0, 100, 100);
      var view = View.create(frame);
      dragdrop.registerDropTarget(view);
      dragdrop.dropTargetCount.should.equal(1);
    });
  });

  describe('unregisterDropTarget', function(){
    it('should decrement the number of drop targets', function(){
      var frame = Rectangle.create(0, 0, 100, 100);
      var view = View.create(frame);
      dragdrop.registerDropTarget(view);
      dragdrop.dropTargetCount.should.equal(1);

      dragdrop.unregisterDropTarget(view);
      dragdrop.dropTargetCount.should.equal(0);
    });

    it('should not decrement the number of drop targets if target was not registered', function(){
      var frame = Rectangle.create(0, 0, 100, 100);
      var view = View.create(frame);
      dragdrop.dropTargetCount.should.equal(0);

      dragdrop.unregisterDropTarget(view);
      dragdrop.dropTargetCount.should.equal(0);
    });

    it('should remove the correct drop target', function(){
      var frame = Rectangle.create(0, 0, 100, 100);
      var viewA = View.create(frame);
      dragdrop.registerDropTarget(viewA);
      dragdrop.dropTargetCount.should.equal(1);

      frame = Rectangle.create(10, 10, 100, 100);
      var viewB = View.create(frame);
      dragdrop.registerDropTarget(viewB);
      dragdrop.dropTargetCount.should.equal(2);

      dragdrop.unregisterDropTarget(viewA);
      dragdrop.dropTargetCount.should.equal(1);

      dragdrop.containsDropTarget(viewA).should.be.false;
      dragdrop.containsDropTarget(viewB).should.be.true;
    });
  });
});
