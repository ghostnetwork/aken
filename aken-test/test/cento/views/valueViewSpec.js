var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LSF = require('../../localStorageFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var Value = require('../../../../cento/kernel/value.js');
var ActionView = require('../../../../cento/views/actionView.js');
var ValueView = require('../../../../cento/views/valueView.js');
require('../../../../verdoux/predicates.js');

describe('ValueView', function(){
  'use strict';

  var kValueFixture = 12345;
  var valueView;

  beforeEach(function() {valueView = ValueView.create(GF.Frame, kValueFixture);});

  it('should be able to be created', function(){assert(existy(valueView));});

  describe('isConnectable', function(){
    it('should return true', function(){
      valueView.isConnectable().should.be.true;
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origValueView = createOriginalView();

      var data = ActionView.toJSON(origValueView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = ValueView.createFromJSON(rawJSON);
      verifyClone(clone, origValueView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  var valueFixture = Value.create(2342);
  function createOriginalView() {
    var origValueView = ValueView.create(GF.Frame, valueFixture);
    return origValueView;
  }

  function verifyClone(clone, origValueView) {
    existy(clone).should.be.true;
    clone.label.should.equal(origValueView.label);
    clone.action.name.should.equal(origValueView.action.name);
  }
  
});
