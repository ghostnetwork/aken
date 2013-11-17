var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
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
  
});
