var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Segment = require('../../../../../cento/kernel/geometry/segment.js');
var Point = require('../../../../../dogbone/geometry/point.js');
var CGF = require('./centoGeometryFixtures.js');
require('../../../../../verdoux/predicates.js');

describe('Segment', function(){
  'use strict';

  var segment;

  beforeEach(function() {segment = Segment.create(CGF.SegmentSpec);});

  it('should be able to be created', function(){assert(existy(segment));});
  
  describe('Segment(spec)', function(){
    it('should retain the start and end points given to it at creation', function(){
      existy(segment.startPoint).should.be.true;
      segment.startPoint.x.should.equal(CGF.StartX);
      segment.startPoint.y.should.equal(CGF.StartY);
      segment.endPoint.x.should.equal(CGF.EndX);
      segment.endPoint.y.should.equal(CGF.EndY);
    });
  });
});
