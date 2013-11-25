var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
require('../../../verdoux/predicates.js');

describe('LocalStorage', function(){
  'use strict';

  var kLocalStorageFileName = './unitTest.localStorage'
    , kLocalStorageKey = "LocalStorageSpec.Foo";

  var localStorage = new LocalStorage(kLocalStorageFileName);


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

      fs.rmdir(kLocalStorageFileName, function(error){
        if (error) {
          console.log('error: ' + error);
        }
        done();
      });
    });
  });
});
