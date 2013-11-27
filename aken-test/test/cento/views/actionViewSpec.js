var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var PF = require('../kernel/ports/portFixtures.js');
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

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origActionView = createOriginalView();

      var data = ActionView.toJSON(origActionView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = ActionView.createFromJSON(rawJSON);
      verifyClone(clone, origActionView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  var labelFixture = "ActionViewSpec.Label";
  var workerFixture = function(){return 'ActionViewSpec.workerFixture';};
  var actionFixture = Action.create(labelFixture, workerFixture);
  function createOriginalView() {
    var origActionView = ActionView.create(GF.Frame, labelFixture, actionFixture);
    return origActionView;
  }

  function verifyClone(clone, origActionView) {
    existy(clone).should.be.true;
    clone.label.should.equal(origActionView.label);
    clone.action.name.should.equal(origActionView.action.name);
  }

});
