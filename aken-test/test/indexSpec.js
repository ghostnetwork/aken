'use strict';

var assert = require('assert')
  , util = require('util')
  , cento = require('../../cento/cento.js');

var AkenTest = require('..');

var akentest;

akentest = new AkenTest();

describe('AkenTest', function(){

  it('should not fail', function(){
    var clone = AkenTest.create();
    assert(clone !== null);
  });
});
