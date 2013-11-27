var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var CentoView = require('../../../../cento/views/centoView.js');
require('../../../../verdoux/predicates.js');

describe('CentoView', function(){
  'use strict';

  var centoView;

  beforeEach(function() {centoView = CentoView.create();});

  it('should be able to be created', function(){assert(existy(centoView));});

  describe('isConnectable', function(){
    it('should return true', function(){
      centoView.isConnectable().should.be.false;
    });
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origCentoView = createOriginalView();

      var data = JSON.stringify(origCentoView);
      existy(data).should.be.true;

      var clone = CentoView.createFromJSON(data);
      verifyClone(clone, origCentoView);
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origCentoView = createOriginalView();

      var data = JSON.stringify(origCentoView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = CentoView.createFromJSON(rawJSON);
      verifyClone(clone, origCentoView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  function createOriginalView() {
    var origCentoView = CentoView.create(GF.Frame);
    return origCentoView;
  }

  function verifyClone(clone, origCentoView) {
    existy(clone).should.be.true;
  }
});
