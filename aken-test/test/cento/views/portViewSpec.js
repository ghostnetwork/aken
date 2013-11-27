var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var PF = require('../kernel/ports/portFixtures.js');
var PortView = require('../../../../cento/views/portView.js');
require('../../../../verdoux/predicates.js');

describe('PortView', function(){
  'use strict';

  var portView;

  beforeEach(function() {portView = PortView.create();});

  it('should be able to be created', function(){assert(existy(portView));});

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origPortView = createOriginalView();

      var data = JSON.stringify(origPortView);
      existy(data).should.be.true;

      var clone = PortView.createFromJSON(data);
      verifyClone(clone, origPortView);
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origPortView = createOriginalView();

      var data = JSON.stringify(origPortView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = PortView.createFromJSON(rawJSON);
      verifyClone(clone, origPortView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  function createOriginalView() {
    var origPortView = PortView.create(GF.Frame, PF.InputPort, null);
    return origPortView;
  }

  function verifyClone(clone, origPortView) {
    existy(clone).should.be.true;
    clone.port.number.should.equal(origPortView.port.number);
  }

});
