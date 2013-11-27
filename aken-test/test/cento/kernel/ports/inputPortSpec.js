var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../../localStorageFixtures.js');
var PF = require('./portFixtures.js');
var InputPort = require('../../../../../cento/kernel/ports/inputPort.js');
require('../../../../../verdoux/predicates.js');

describe('InputPort', function(){
  'use strict';

  var kInputPortName = "InputPort.Spec.Name";
  var inputPort;

  beforeEach(function() {inputPort = InputPort.create(kInputPortName);});

  it('should be able to be created', function(){assert(existy(inputPort));});
  
  it('should have a type of Output', function(){
    var actual = inputPort.type;
    existy(actual).should.be.true;
    actual.should.equal('Input');
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origInputPort = createOrigInputPort();

      var data = JSON.stringify(origInputPort);
      existy(data).should.be.true;

      var clone = InputPort.createFromJSON(data);
      verifyClone(clone, origInputPort);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origInputPort = createOrigInputPort();
      var data = JSON.stringify(origInputPort);

      var lsKey = "InputPortSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = InputPort.createFromJSON(rawJSON);
      verifyClone(clone, origInputPort);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  var portNumberFixture = 1234321;
  function createOrigInputPort() {
    var spec = {"number":portNumberFixture};
    var origInputPort = InputPort.create(portNumberFixture);
    origInputPort.makeConnected();
    return origInputPort;
  };

  function verifyClone(clone, origInputPort) {
    existy(clone).should.be.true;
    clone.number.should.equal(origInputPort.number);
    clone.isConnected.should.equal(origInputPort.isConnected);
    clone.guid.should.not.equal(origInputPort.guid);
    clone.type.should.equal(origInputPort.type);
  }
});
