var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Program = require('../../../../cento/kernel/program.js');
var Action = require('../../../../cento/kernel/action.js');
require('../../../../verdoux/predicates.js');

describe('Program', function(){
  'use strict';

  var kName = "ProgramSpec"
    , kWorker = function(){return 'ProgramSpec.Worker';}
    , kAction = Action.create("ProgramSpec.Action", kWorker);
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
});
