require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Action = require('../../../../../cento/kernel/action/action.js');

describe('Action', function(){
  'use strict';

  var kName = "ActionSpec.name"
    , kWorker = workerDrone;
  var action
    , workerDroneWasCalled;

  beforeEach(function() {
    action = Action.create(kName, kWorker);
    workerDroneWasCalled = false;
  });

  it('should be able to be created', function(){assert(existy(action));});

  describe('configuration', function(){
    it('should store the name given to it at creation', function(){
      var result = action.name;
      result.should.equal(kName);
    });

    it('should call the worker drone when triggered', function(){
      action.perform();
      workerDroneWasCalled.should.be.true;
    });
  });

  function workerDrone(theAction) {
    workerDroneWasCalled = true;
    action.should.equal(theAction);
  }
});
