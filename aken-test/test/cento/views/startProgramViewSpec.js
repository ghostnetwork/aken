var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('../../dogbone/geometry/geometryFixtures.js');
var Action = require('../../../../cento/kernel/action/action.js');
var StartProgramView = require('../../../../cento/views/startProgramView.js');
require('../../../../verdoux/predicates.js');

describe('StartProgramView', function(){
  'use strict';

  var kActionName = "StartProgramViewSpec.Action.Name"
    , kLabel = "StartProgramViewSpec.Action.Label"
    , kWorker = function(args) {actionWasCalled = true;}
    , kAction = Action.create(kActionName, kWorker);

  var startProgramView;

  beforeEach(function() {
    startProgramView = StartProgramView.create(GF.Frame, kLabel, kAction);
  });

  it('should be able to be created', function(){assert(existy(startProgramView));});

});
