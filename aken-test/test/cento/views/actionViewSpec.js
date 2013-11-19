var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var Action = require('../../../../cento/kernel/action.js');
var InputPort = require('../../../../cento/kernel/ports/inputPort.js');
var ActionView = require('../../../../cento/views/actionView.js');
require('../../../../verdoux/predicates.js');

describe('ActionView', function(){
  'use strict';

  var kActionName = "ActionViewSpec.Action.Name"
    , kLabel = "ActionViewSpec.Action.Label"
    , kWorker = function(args) {actionWasCalled = true;}
    , kAction = Action.create(kActionName, kWorker)
    , kArgs = "ActionViewSpec.Args";
  var actionView
    , actionWasCalled;

  beforeEach(function() {
    actionView = ActionView.create(GF.Frame, kLabel, kAction);
    actionWasCalled = false;
  });

  it('should be able to be created', function(){assert(existy(actionView));});

  describe('isConnectable', function(){
    it('should return true', function(){
      actionView.isConnectable().should.be.true;
    });
  });
  
  describe('action', function(){
    it('should correctly save the given action', function(){
      existy(actionView.action).should.be.true;
      actionView.action.should.equal(kAction);
    });

    it('should call the worker when performed', function(){
      actionView.action.perform(kArgs);
      actionWasCalled.should.be.true;
    });

    it('should throw error if action is notExisty', function(){
      (function(){
        var anActionView = ActionView.create(GF.Frame, kLabel);
        anActionView.onTouch();
      }).should.throw();
    });
  });
});
