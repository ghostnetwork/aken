var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var PortView = require('../../../../../cento/views/kernel/portView.js');
require('../../../../../verdoux/predicates.js');

describe('PortView', function(){
  'use strict';

  var portView;

  beforeEach(function() {portView = PortView.create();});

  it('should be able to be created', function(){assert(existy(portView));});
  
});
