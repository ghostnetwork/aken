var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Action = require('../../../../cento/kernel/action.js');
require('../../../../verdoux/predicates.js');

describe('Action', function(){
  'use strict';

  var kName = "ActionSpec.name"
    , kWorker = workerDrone
    , kArgs = "ActionSpec.args";
  var action
    , workerDroneWasCalled;

  beforeEach(function() {
    action = Action.create(kName, workerDrone);
    workerDroneWasCalled = false;
  });

  it('should be able to be created', function(){assert(existy(action));});

  describe('configuration', function(){
    it('should store the name given to it at creation', function(){
      var result = action.name;
      result.should.equal(kName);
    });

    it('should call the worker drone when triggered', function(){
      action.perform(kArgs);
      workerDroneWasCalled.should.be.true;
    });
  });

  describe('connectWith', function(){
    it('should retain the action given', function(){
      var actionA = Action.create('Action.A');
      var actionB = Action.create('Action.B');
      actionA.connectWith(actionB);

      existy(actionA.nextAction).should.be.true;
      actionA.nextAction.should.equal(actionB);
    });
  });

  function workerDrone(theAction, theArgs) {
    workerDroneWasCalled = true;
    theAction.should.equal(action.worker);
    theArgs.should.equal(kArgs);
  }
});
