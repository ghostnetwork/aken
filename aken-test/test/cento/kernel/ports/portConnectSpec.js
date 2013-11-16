var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var PortConnect = require('../../../../../cento/kernel/ports/portConnect.js');
require('../../../../../verdoux/predicates.js');

describe('PortConnect', function(){
  'use strict';

  var portConnect;

  beforeEach(function() {portConnect = PortConnect.create();});

  it('should be able to be created', function(){assert(existy(portConnect));});
  
});
