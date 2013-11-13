var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('../../../dogbone/geometry/geometryFixtures.js');
var Action = require('../../../../../cento/kernel/action/action.js');
var InputPort = require('../../../../../cento/kernel/ports/inputPort.js');
var ActionView = require('../../../../../cento/views/kernel/actionView.js');
require('../../../../../verdoux/predicates.js');

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
  
  describe('action', function(){
    it('should correctly save the given action', function(){
      existy(actionView.action).should.be.true;
      actionView.action.should.equal(kAction);
    });

    it('should call the worker when performed', function(){
      actionView.action.perform(kArgs);
      actionWasCalled.should.be.true;
    });

    it('should not throw error if action is notExisty', function(){
      var anActionView = ActionView.create(GF.Frame, kLabel);
      anActionView.onTouch();
    });
  });

  describe('addInputPort', function(){
    it('should ignore if given inputPort is notExisty', function(){
      var fake;
      actionView.addInputPort(fake);
      actionView.inputPortsCount.should.equal(0);
    });

    it('should add the given inputPort', function(){
      var port = InputPort.create("Port");
      actionView.addInputPort(port);
      actionView.inputPortsCount.should.equal(1);
    });
  });

  describe('addInputPorts', function(){
    it('should ignore if given input is notExisty', function(){
      var ports;
      actionView.addInputPorts(ports);
      actionView.inputPortsCount.should.equal(0);
    });
  });
});
