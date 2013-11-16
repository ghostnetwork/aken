var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Connector = require('../../../../cento/kernel/connector.js');
var InputPort = require('../../../../cento/kernel/ports/inputPort.js');
var OutputPort = require('../../../../cento/kernel/ports/outputPort.js');
require('../../../../verdoux/predicates.js');

describe('Connector', function(){
  'use strict';

  var kInputPort = InputPort.create(0)
    , kOutputPort = OutputPort.create(0);
  var spec
    , connector;

  beforeEach(function() {
    spec = {
      "startPort":kOutputPort,
      "endPort":kInputPort
    };
    connector = Connector.create(spec);
  });

  it('should be able to be created', function(){assert(existy(connector));});
  
  it('should have the expected start port', function(){
    var actual = connector.startPort;
    existy(actual).should.be.true;
    actual.number.should.equal(kInputPort.number)
  });
  
  it('should have the expected end port', function(){
    var actual = connector.endPort;
    existy(actual).should.be.true;
    actual.number.should.equal(kOutputPort.number)
  });
});
