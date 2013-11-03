require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var _ = require('underscore');
var Program = require('../../../../../cento/kernel/program/program.js');
var Action = require('../../../../../cento/kernel/action/action.js');

describe('Program', function(){
  'use strict';

  var kTestActionName = "TestActionName";
  var program;

  beforeEach(function() {
    program = Program.create();
  });

  it('should be able to be created', function(){
    assert(existy(program));
  });


  describe('push', function(){
    it('should ignore if action is notExisty', function(){
      var action;
      program.push(action);
      var numActions = program.actionCount;
      numActions.should.equal(0);
    });

    it('should add the action if existy', function(){
      var action = Action.create(kTestActionName);
      program.push(action);
      var numActions = program.actionCount;
      numActions.should.equal(1);
    });
  });

  describe('pop', function(){
    it('should return notExisty if no actions', function(){
      var result = program.pop();
      notExisty(result).should.be.true;
    });

    it('should return existy if there is at least one action', function(){
      var action = Action.create(kTestActionName);
      program.push(action);
      var result = program.pop();
      existy(result).should.be.true;

      var numActions = program.actionCount;
      numActions.should.equal(0);
    });

    it('should return the top-most action', function(){
      var firstActionName = 'FirstAction';
      var firstAction = Action.create(firstActionName);
      program.push(firstAction);

      var secondActionName = 'SecondAction';
      var secondAction = Action.create(secondActionName);
      program.push(secondAction);

      var result = program.pop();
      existy(result).should.be.true;

      result.name.should.equal(secondActionName);

      var numActions = program.actionCount;
      numActions.should.equal(1);
    });

    it('should return notExisty when all actions have been popped', function(){
      var firstActionName = 'FirstAction';
      var firstAction = Action.create(firstActionName);
      program.push(firstAction);

      var secondActionName = 'SecondAction';
      var secondAction = Action.create(secondActionName);
      program.push(secondAction);

      var result = program.pop();
      existy(result).should.be.true;

      result.name.should.equal(secondActionName);

      var numActions = program.actionCount;
      numActions.should.equal(1);

      result = program.pop();
      existy(result).should.be.true;

      result.name.should.equal(firstActionName);

      numActions = program.actionCount;
      numActions.should.equal(0);
    });
  });

  describe('executeAsStack', function(){
    it('should execute the actions in order', function(){
      for (var i = 0; i < 5; i++) {
        var name = 'Action.' + i;
        var worker = function(){};
        var action = Action.create(name, worker);
        program.push(action);
      }

      var popped;
      do {
        program.executeAsStack();
        popped = program.pop();
      } while (existy(popped));
    });
  });

  describe('executeAsSequence', function(){
    it('should execute the actions in order', function(){
    for (var i = 0; i < 5; i++) {
      var name = 'Action.' + i;
      var worker = function(){};
      var action = Action.create(name, worker);
      program.push(action);
    }

    var popped;
    do {
      program.executeAsSequence();
      popped = program.pop();
    } while (existy(popped));
    });
  });
});
