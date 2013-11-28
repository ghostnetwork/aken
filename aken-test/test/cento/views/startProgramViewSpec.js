var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LSF = require('../../localStorageFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var Action = require('../../../../cento/kernel/action.js');
var ActionView = require('../../../../cento/views/actionView.js');
var StartProgramView = require('../../../../cento/views/startProgramView.js');
require('../../../../verdoux/predicates.js');

describe('StartProgramView', function(){
  'use strict';

  var kActionName = "StartProgramViewSpec.Action.Name"
    , kLabel = "StartProgramViewSpec.Action.Label"
    , kWorker = function(args) {actionWasCalled = true;}
    , kAction = Action.create(kActionName, kWorker);

  var startProgramView;

  beforeEach(function() {
    startProgramView = StartProgramView.create(GF.Frame, kLabel, kAction);
  });

  it('should be able to be created', function(){assert(existy(startProgramView));});

  describe('isConnectable', function(){
    it('should return true', function(){
      startProgramView.isConnectable().should.be.true;
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origStartProgramView = createOriginalView();

      var data = ActionView.toJSON(origStartProgramView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = StartProgramView.createFromJSON(rawJSON);
      verifyClone(clone, origStartProgramView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  var labelFixture = "StartProgramViewSpec.Label";
  var workerFixture = function(){return 'StartProgramViewSpec.workerFixture';};
  var actionFixture = Action.create(labelFixture, workerFixture);
  function createOriginalView() {
    var origStartProgramView = StartProgramView.create(GF.Frame, labelFixture, actionFixture);
    return origStartProgramView;
  }

  function verifyClone(clone, origStartProgramView) {
    existy(clone).should.be.true;
    clone.label.should.equal(origStartProgramView.label);
    clone.action.name.should.equal(origStartProgramView.action.name);
  }
});
