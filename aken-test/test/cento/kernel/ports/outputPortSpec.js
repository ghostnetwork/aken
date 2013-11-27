var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../../localStorageFixtures.js');
var PF = require('./portFixtures.js');
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

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origOutputPort = createOrigOutputPort();

      var data = JSON.stringify(origOutputPort);
      existy(data).should.be.true;

      var clone = OutputPort.createFromJSON(data);
      verifyClone(clone, origOutputPort);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origOutputPort = createOrigOutputPort();
      var data = JSON.stringify(origOutputPort);

      var lsKey = "OutputPortSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = OutputPort.createFromJSON(rawJSON);
      verifyClone(clone, origOutputPort);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  var portNumberFixture = 1234321;
  function createOrigOutputPort() {
    var spec = {"number":portNumberFixture};
    var origOutputPort = OutputPort.create(portNumberFixture);
    origOutputPort.makeConnected();
    return origOutputPort;
  };

  function verifyClone(clone, origOutputPort) {
    existy(clone).should.be.true;
    clone.number.should.equal(origOutputPort.number);
    clone.isConnected.should.equal(origOutputPort.isConnected);
    clone.guid.should.not.equal(origOutputPort.guid);
    clone.type.should.equal(origOutputPort.type);
  }
});
