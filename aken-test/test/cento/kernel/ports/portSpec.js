var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Port = require('../../../../../cento/kernel/ports/port.js');
require('../../../../../verdoux/predicates.js');

describe('Port', function(){
  'use strict';

  var kPortNumber = 12345;
  var port;

  beforeEach(function() {port = Port.create(kPortNumber);});

  it('should be able to be created', function(){assert(existy(port));});
  
  it('should retain the number given at creation', function(){
    var actual = port.number;
    actual.should.equal(kPortNumber);
  });

  it('should return an existy name', function(){
    var name = port.name;
    existy(name).should.be.true;
  });

  describe('connected', function(){
    it('should return false by default', function(){
      port.isConnected.should.be.false;
    });

    it('should return true after makeConnected', function(){
      port.makeConnected();
      port.isConnected.should.be.true;
    });

    it('should return false after makeConnected', function(){
      port.makeConnected();
      port.isConnected.should.be.true;
      
      port.makeDisconnected();
      port.isConnected.should.be.false;
    });
  });
});
