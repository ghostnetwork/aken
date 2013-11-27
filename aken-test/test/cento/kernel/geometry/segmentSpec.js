var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../../localStorageFixtures.js');
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

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origSegment = createOrigSegment();

      var data = JSON.stringify(origSegment);
      existy(data).should.be.true;

      var clone = Segment.createFromJSON(data);
      verifyClone(clone, origSegment);
    });
  });

  describe('LocalStorage', function(done){
    it('should be able to save and restore from LocalStorage', function(done){
      var origSegment = createOrigSegment();
      var data = JSON.stringify(origSegment);

      var lsKey = "SegmentSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = Segment.createFromJSON(rawJSON);
      verifyClone(clone, origSegment);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });
    });
  });

  function createOrigSegment() {
    var spec = {
      "startPoint":CGF.SegmentStartPoint, 
      "endPoint":CGF.SegmentEndPoint
    };
    var origSegment = Segment.create(spec);
    return origSegment;
  };

  function verifyClone(clone, origSegment) {
    existy(clone).should.be.true;
    clone.startPoint.debugString().should.equal(origSegment.startPoint.debugString());
    clone.endPoint.debugString().should.equal(origSegment.endPoint.debugString());
  }
});
