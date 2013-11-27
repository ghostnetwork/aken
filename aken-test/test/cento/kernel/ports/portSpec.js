var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../../localStorageFixtures.js');
var PF = require('./portFixtures.js');
var Port = require('../../../../../cento/kernel/ports/port.js');
require('../../../../../verdoux/predicates.js');
require('../../../../../verdoux/guid.js');

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

  describe('guid', function(){
    it('should return a semi-unique value', function(){
      var otherPort = Port.create(54321);
      existy(otherPort.guid).should.be.true;
      otherPort.guid.should.not.equal(port.guid);
    });
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origPort = createOrigPort();

      var data = JSON.stringify(origPort);
      existy(data).should.be.true;

      var clone = Port.createFromJSON(data);
      verifyClone(clone, origPort);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origPort = createOrigPort();
      var data = JSON.stringify(origPort);

      var lsKey = "PortSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = Port.createFromJSON(rawJSON);
      verifyClone(clone, origPort);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  var portNumberFixture = 1234;
  function createOrigPort() {
    var spec = {"number":portNumberFixture};
    var origPort = Port.create(portNumberFixture);
    origPort.makeConnected();
    return origPort;
  };

  function verifyClone(clone, origPort) {
    existy(clone).should.be.true;
    clone.number.should.equal(origPort.number);
    clone.isConnected.should.equal(origPort.isConnected);
    clone.guid.should.not.equal(origPort.guid);
  }
});
