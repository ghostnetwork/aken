var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var SegmentView = require('../../../../cento/views/segmentView.js');
var Segment = require('../../../../cento/kernel/geometry/segment.js');
var CGF = require('../kernel/geometry/centoGeometryFixtures.js');
require('../../../../verdoux/predicates.js');

describe('SegmentView', function(){
  'use strict';

  var segmentView;

  beforeEach(function() {segmentView = SegmentView.create(CGF.Segment);});

  it('should be able to be created', function(){assert(existy(segmentView));});
  
});
