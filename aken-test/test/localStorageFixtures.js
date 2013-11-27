var LocalStorage = require('node-localstorage').LocalStorage
  , rmdir = require('rimraf');

(function() {
  'use strict';
  
  function LocalStorageFixtures(){
    var that = {
      get fileName(){return _fileName;},
      get localStorage(){return _localStorage;},
    };

    that.initialize = function() {
      _localStorage = new LocalStorage(LocalStorageFixtures.global.fileName);
      return _localStorage
    };
    that.cleanup = function(handler) {rmdir(LocalStorageFixtures.global.fileName, handler);};

    var _fileName = './unitTest.localStorage'
      , _localStorage = null;

    return that;
  };

  LocalStorageFixtures.create = function() {return new LocalStorageFixtures();};
  LocalStorageFixtures.global = LocalStorageFixtures.create();

  module.exports = LocalStorageFixtures;

}).call(this);

