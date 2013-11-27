var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var PF = require('./ports/portFixtures.js');
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

  describe('createFromJSON', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origConnector = createOrigConnector();

      var data = JSON.stringify(origConnector);
      existy(data).should.be.true;

      var clone = Connector.createFromJSON(data);
      verifyClone(clone, origConnector);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origConnector = createOrigConnector();
      var data = JSON.stringify(origConnector);

      var lsKey = "ConnectorSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = Connector.createFromJSON(rawJSON);
      verifyClone(clone, origConnector);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  function createOrigConnector() {
    var spec = {
      "startPort":PF.OutputPort,
      "endPort":PF.InputPort
    };
    var origConnector = Connector.create(spec);
    return origConnector;
  };

  function verifyClone(clone, origConnector) {
    existy(clone).should.be.true;
    clone.startPort.number.should.equal(origConnector.startPort.number);
    clone.endPort.number.should.equal(origConnector.endPort.number);
  }
});
