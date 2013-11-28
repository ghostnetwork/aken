var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LSF = require('../../localStorageFixtures.js');
var PF = require('../kernel/ports/portFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var Action = require('../../../../cento/kernel/action.js');
var EndProgramView = require('../../../../cento/views/endProgramView.js');
var ActionView = require('../../../../cento/views/actionView.js');
require('../../../../verdoux/predicates.js');

describe('EndProgramView', function(){
  'use strict';

  var kActionName = "EndProgramViewSpec.Action.Name"
    , kLabel = "EndProgramViewSpec.Action.Label"
    , kWorker = function(args) {actionWasCalled = true;}
    , kAction = Action.create(kActionName, kWorker);

  var endProgramView;

  beforeEach(function() {
    endProgramView = EndProgramView.create(GF.Frame, kLabel, kAction);
  });

  it('should be able to be created', function(){assert(existy(endProgramView));});

  describe('isConnectable', function(){
    it('should return true', function(){
      endProgramView.isConnectable().should.be.true;
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origEndProgramView = createOriginalView();

      var data = ActionView.toJSON(origEndProgramView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = EndProgramView.createFromJSON(rawJSON);
      verifyClone(clone, origEndProgramView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  var labelFixture = "EndProgramViewSpec.Label";
  var workerFixture = function(){return 'EndProgramViewSpec.workerFixture';};
  var actionFixture = Action.create(labelFixture, workerFixture);
  function createOriginalView() {
    var origEndProgramView = EndProgramView.create(GF.Frame, labelFixture, actionFixture);
    return origEndProgramView;
  }

  function verifyClone(clone, origEndProgramView) {
    existy(clone).should.be.true;
    clone.label.should.equal(origEndProgramView.label);
    clone.action.name.should.equal(origEndProgramView.action.name);
  }
  
});
