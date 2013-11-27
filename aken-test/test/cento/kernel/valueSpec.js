var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var Value = require('../../../../cento/kernel/value.js');
require('../../../../verdoux/predicates.js');

describe('Value', function(){
  'use strict';

  var kValueFixture = 12345;
  var value;

  beforeEach(function() {value = Value.create(kValueFixture);});

  it('should be able to be created', function(){assert(existy(value));});
  it('should retain the value given at creation', function(){
    existy(value.value).should.be.true;
    value.value.should.equal(kValueFixture);
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origValue = createOrigValue();

      var data = JSON.stringify(origValue);
      existy(data).should.be.true;

      var clone = Value.createFromJSON(data);
      verifyClone(clone, origValue);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origValue = createOrigValue();
      var data = JSON.stringify(origValue);

      var lsKey = "ValueSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = Value.createFromJSON(rawJSON);
      verifyClone(clone, origValue);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  var descriptionFixture = 'ValueSpec.Description';

  function createOrigValue() {
    var origValue = Value.create(kValueFixture);
    origValue.description = descriptionFixture;
    return origValue;
  };

  function verifyClone(clone, origValue) {
    existy(clone).should.be.true;
    clone.description.should.equal(origValue.description);
  }
});
