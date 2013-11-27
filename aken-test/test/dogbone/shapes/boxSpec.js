var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LocalStorageFixtures = require('../../localStorageFixtures.js');
var GF = require('../geometry/geometryFixtures.js');
var Box = require('../../../../dogbone/shapes/box.js');
require('../../../../verdoux/predicates.js');

describe('Box', function(){
  'use strict';

  var box;

  beforeEach(function() {box = Box.create(GF.Frame);});

  it('should be able to be created', function(){assert(existy(box));});

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(){
      var zOrderFixture = 1234;
      box.zOrder = zOrderFixture;

      var data = JSON.stringify(box);
      existy(data).should.be.true;

      var result = JSON.parse(data);
      existy(result).should.be.true;
      result.zOrder.should.equal(zOrderFixture);
    });
  });
  
});
