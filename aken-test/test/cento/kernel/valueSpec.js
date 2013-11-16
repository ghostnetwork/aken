var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
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
});
