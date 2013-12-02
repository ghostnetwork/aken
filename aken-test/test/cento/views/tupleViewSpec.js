var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LSF = require('../../localStorageFixtures.js');
var PF = require('../kernel/ports/portFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var CGF = require('../kernel/geometry/centoGeometryFixtures.js');
var Action = require('../../../../cento/kernel/action.js');
var Tuple = require('../../../../cento/kernel/tuple.js');
var ActionView = require('../../../../cento/views/actionView.js');
var TupleView = require('../../../../cento/views/tupleView.js');
require('../../../../verdoux/predicates.js');

describe('TupleView', function(){
  'use strict';

  function tupleWorker(input) {};

  var kTupleAction = Action.create('TupleViewSpec.Tuple.Action', tupleWorker);
  var kTupleViewSpec = {
      "frame": GF.Frame
    , "tuple":CGF.Tuple
    , "tupleAction":kTupleAction
  };
  var tupleView;

  beforeEach(function() {tupleView = TupleView.create(kTupleViewSpec);});

  it('should be able to be created', function(){assert(existy(tupleView));});

  describe('properties', function(){
    it('should retain the given tuple', function(){
      existy(tupleView.tuple).should.be.true;
      tupleView.tuple.first.should.equal(CGF.Tuple.FirstItem);
      tupleView.tuple.second.should.equal(CGF.Tuple.SecondItem);
    });

    it('should retain the given tuple action', function(){
      existy(tupleView.tupleAction).should.be.true;
      tupleView.tupleAction.should.equal(kTupleAction);
    });
  });

  describe('LocalStorage', function(){
    it('should be able to save and restore from LocalStorage', function(done){
      var origTupleView = createOriginalView();

      var data = ActionView.toJSON(origTupleView);
      existy(data).should.be.true;

      var lsKey = "ViewSpec.LocalStorage";
      LSF.global.initialize();
      LSF.global.localStorage.setItem(lsKey, data);

      var rawJSON = LSF.global.localStorage.getItem(lsKey);
      existy(rawJSON).should.be.true;

      var clone = TupleView.createFromJSON(rawJSON);
      verifyClone(clone, origTupleView);

      LSF.global.cleanup(function(error){
        if (error) {throw error;}
        done();
      });

    });
  });

  var tupleFirst  = 'TupleSpec.Tuple.First';
  var tupleSecond = 'TupleSpec.Tuple.Second';
  var tupleFixture = Tuple.createWithSpec({"first":tupleFirst, "second":tupleSecond});
  var tupleAction = Action.create('TupleSpec.Tuple.Action', function(){});

  function createOriginalView() {
    var spec = {
      "frame":GF.Frame, "tuple":tupleFixture, "tupleAction":tupleAction
    };
    var origTupleView = TupleView.create(spec);
    return origTupleView;
  }

  function verifyClone(clone, origTupleView) {
    existy(clone).should.be.true;
  }
});
