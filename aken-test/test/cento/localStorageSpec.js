var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../localStorageFixtures.js');
require('../../../verdoux/predicates.js');

describe('LocalStorage', function(){
  'use strict';

  var kLocalStorageKey = "LocalStorageSpec.Foo"
    , localStorage = null;

  beforeEach(function() {localStorage = LSF.global.initialize();});

  it('should be able to be created', function(){assert(existy(localStorage));});

  describe('setItem-getItem', function(){

    it('should be able to store and retrieve a value from LocalStorage', function(){
      var value = "foo";
      localStorage.setItem(kLocalStorageKey, value);

      var loadedValue = localStorage.getItem(kLocalStorageKey);
      loadedValue.should.not.be.null;
      loadedValue.should.equal(value);
    });

    it('should be able to remove a previously added item', function(done){
      var value = "foo";
      localStorage.setItem(kLocalStorageKey, value);

      var loadedValue = localStorage.getItem(kLocalStorageKey);
      loadedValue.should.not.be.null;
      loadedValue.should.equal(value);
      localStorage.removeItem(kLocalStorageKey);

      loadedValue = localStorage.getItem(kLocalStorageKey);
      notExisty(loadedValue).should.be.true;

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });
});
