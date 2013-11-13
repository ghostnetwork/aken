var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var InputPort = require('../../../../../cento/kernel/ports/inputPort.js');
require('../../../../../verdoux/predicates.js');

describe('InputPort', function(){
  'use strict';

  var kInputPortName = "InputPort.Spec.Name";
  var inputPort;

  beforeEach(function() {inputPort = InputPort.create(kInputPortName);});

  it('should be able to be created', function(){assert(existy(inputPort));});
  
  it('should retain the name given at creation', function(){
    var name = inputPort.name;
    name.should.not.be.null;
  });
});
