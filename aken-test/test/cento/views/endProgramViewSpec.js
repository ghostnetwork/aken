var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var Action = require('../../../../cento/kernel/action.js');
var EndProgramView = require('../../../../cento/views/endProgramView.js');
require('../../../../verdoux/predicates.js');

describe('EndProgramView', function(){
  'use strict';

  var kActionName = "EndProgramViewSpec.Action.Name"
    , kLabel = "EndProgramViewSpec.Action.Label"
    , kWorker = function(args) {actionWasCalled = true;}
    , kAction = Action.create(kActionName, kWorker);

  var endProgramView;

  beforeEach(function() {
    endProgramView = EndProgramView.create(GF.Frame, kLabel, kAction);
  });

  it('should be able to be created', function(){assert(existy(endProgramView));});

  describe('isConnectable', function(){
    it('should return true', function(){
      endProgramView.isConnectable().should.be.true;
    });
  });
  
});
