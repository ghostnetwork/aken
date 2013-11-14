var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var OutputPort = require('../../../../../cento/kernel/ports/outputPort.js');
require('../../../../../verdoux/predicates.js');

describe('OutputPort', function(){
  'use strict';

  var kOutputPortNumber = 54321;
  var outputPort;

  beforeEach(function() {outputPort = OutputPort.create(kOutputPortNumber);});

  it('should be able to be created', function(){assert(existy(outputPort));});
  
  it('should have a type of Output', function(){
    var actual = outputPort.type;
    existy(actual).should.be.true;
    actual.should.equal('Output');
  });
});
