var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var PF = require('./ports/portFixtures.js');
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
      var actionA = Action.create('Action.A', kWorker);
      var actionB = Action.create('Action.B', kWorker);
      actionA.connectWith(actionB);

      existy(actionA.nextAction).should.be.true;
      actionA.nextAction.should.equal(actionB);
    });
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origAction = createOrigAction();

      var data = JSON.stringify(origAction);
      existy(data).should.be.true;

      var clone = Action.createFromJSON(data);
      verifyClone(clone, origAction);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origAction = createOrigAction();
      var data = JSON.stringify(origAction);

      var lsKey = "ActionSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = Action.createFromJSON(rawJSON);
      verifyClone(clone, origAction);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  var actionName = 'ActionSpec.Action';
  var actionWorker = function(){return 'ActionSpec.ActionWorker';};
  var nextAction = Action.create('ActionSpec.NextAction', null);
  var descriptionFixture = 'ActionSpec.Description';

  function createOrigAction() {
    var origAction = Action.create(actionName, actionWorker);
    origAction.connectWith(nextAction);
    origAction.enableInputPort(PF.InputPortNumber);
    origAction.enableOutputPort(PF.OutputPortNumber);
    origAction.description = descriptionFixture;
    return origAction;
  };

  function verifyClone(clone, origAction) {
    existy(clone).should.be.true;
    clone.nextAction.name.should.equal(nextAction.name);
    clone.inputPort.number.should.equal(origAction.inputPort.number);
    clone.outputPort.number.should.equal(origAction.outputPort.number);
    clone.description.should.equal(origAction.description);
  }

  function workerDrone(theAction, theArgs) {
    workerDroneWasCalled = true;
    theAction.should.equal(action.worker);
    theArgs.should.equal(kArgs);
  }
});
