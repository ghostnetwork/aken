var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var ValueView = require('../../../../cento/views/valueView.js');
require('../../../../verdoux/predicates.js');

describe('ValueView', function(){
  'use strict';

  var valueView;

  beforeEach(function() {valueView = ValueView.create(GF.Frame);});

  it('should be able to be created', function(){assert(existy(valueView));});
  
});
