var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LocalStorage = require('node-localstorage').LocalStorage;
var LSF = require('../../localStorageFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var SegmentView = require('../../../../cento/views/segmentView.js');
var Segment = require('../../../../cento/kernel/geometry/segment.js');
var CGF = require('../kernel/geometry/centoGeometryFixtures.js');
require('../../../../verdoux/predicates.js');

describe('SegmentView', function(){
  'use strict';

  var segmentView;

  beforeEach(function() {segmentView = SegmentView.create(CGF.Segment);});

  it('should be able to be created', function(){assert(existy(segmentView));});

  describe('isConnectable', function(){
    it('should return true', function(){
      segmentView.isConnectable().should.be.false;
    });
  });

  describe('createFromJSON / createFromSpec', function(){
    it('should be able to create a new object from the given JSON', function(){
      var origSegmentView = createOriginalView();

      var data = JSON.stringify(origSegmentView);
      existy(data).should.be.true;
      
      var clone = SegmentView.createFromJSON(data);
      verifyClone(clone, origSegmentView);
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origSegmentView = createOriginalView();

      var data = JSON.stringify(origSegmentView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = SegmentView.createFromJSON(rawJSON);
      verifyClone(clone, origSegmentView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  function createOriginalView() {
    var origSegmentView = SegmentView.create(CGF.Segment, CGF.Connector);
    origSegmentView.markForDeletion();
    return origSegmentView;
  }

  function verifyClone(clone, origSegmentView) {
    existy(clone).should.be.true;
    
    var expected = origSegmentView.segment.startPoint.debugString();
    clone.segment.startPoint.debugString().should.equal(expected);

    expected = origSegmentView.segment.endPoint.debugString();
    clone.segment.endPoint.debugString().should.equal(expected);

    expected = origSegmentView.connector.startPort.number;
    clone.connector.startPort.number.should.equal(expected);

    expected = origSegmentView.connector.endPort.number;
    clone.connector.endPort.number.should.equal(expected);    
  }
});
