var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var LSF = require('../../localStorageFixtures.js');
var PF = require('../kernel/ports/portFixtures.js');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var CGF = require('../kernel/geometry/centoGeometryFixtures.js');
var Action = require('../../../../cento/kernel/action.js');
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
});
