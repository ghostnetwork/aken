var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Program = require('../../../../cento/kernel/program.js');
var Action = require('../../../../cento/kernel/action.js');
require('../../../../verdoux/predicates.js');

describe('Program', function(){
  'use strict';

  var kName = "ProgramSpec";
  var kAction = Action.create("ProgramSpec.Action");
  var program;

  beforeEach(function() {
    program = Program.create(kName);
  });

  it('should be able to be created', function(){assert(existy(program));});

  describe('isRunning', function(){
    it('should default to false', function(){
      program.isRunning.should.be.false;
    });

    it('should be true when the program has been started', function(){
      program.start(kAction);
      program.isRunning.should.be.true;
    });

    it('should be false when the program has been ended', function(){
      program.start(kAction);
      program.end();
      program.isRunning.should.be.false;
    });
  });

  describe('start', function(){
    it('should retain the given firstAction', function(){
      program.start(kAction);
      existy(program.firstAction).should.be.true;
    });
  });

  describe('actionsMap', function(){
    var visitedActions = [];
    it('should visit all actions', function(){
      var actionA = Action.create("Action.A", function(action) {
        existy(action).should.be.true;
        action.should.equal(actionA.worker);
        visitedActions.push(action);
      });
      var actionB = Action.create("Action.B", function(action) {
        existy(action).should.be.true;
        action.should.equal(actionB.worker);
        visitedActions.push(action);
      });
      var actionC = Action.create("Action.C", function(action) {
        existy(action).should.be.true;
        action.should.equal(actionC.worker);
        visitedActions.push(action);
      });
      actionA.connectWith(actionB);
      actionB.connectWith(actionC);
      program.actionsMap(actionA, function(action) {
        action.perform(action);
      });
      visitedActions.length.should.equal(3);
    });
  });

  describe('start', function(){
    var visitedActions = [];
    it('should visit all actions', function(){
      var actionA = Action.create("Action.A", function(action) {
        existy(action).should.be.true;
        action.should.equal(actionA.worker);
        visitedActions.push(action);
      });
      var actionB = Action.create("Action.B", function(action) {
        existy(action).should.be.true;
        action.should.equal(actionB.worker);
        visitedActions.push(action);
      });
      var actionC = Action.create("Action.C", function(action) {
        existy(action).should.be.true;
        action.should.equal(actionC.worker);
        visitedActions.push(action);
      });
      actionA.connectWith(actionB);
      actionB.connectWith(actionC);
      program.start(actionA);
      visitedActions.length.should.equal(3);
    });
  });
});
