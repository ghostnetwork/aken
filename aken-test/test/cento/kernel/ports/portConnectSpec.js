var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var GF = require('../../../dogbone/geometry/geometryFixtures.js');
var CGF = require('../geometry/centoGeometryFixtures.js');
var PF = require('./portFixtures.js');
var PortConnect = require('../../../../../cento/kernel/ports/portConnect.js');
var Action = require('../../../../../cento/kernel/action.js');
var CentoView = require('../../../../../cento/views/centoView.js');
var ActionView = require('../../../../../cento/views/actionView.js');
var SegmentView = require('../../../../../cento/views/segmentView.js');
require('../../../../../verdoux/predicates.js');

describe('PortConnect', function(){
  'use strict';

  var kStartWorker = function(){return 'PortConnectSpec.StartWorker';}
    , kEndWorker = function(){return 'PortConnectSpec.EndWorker';};

  var kStartAction = Action.create('PortConnectSpec.StartAction', kStartWorker)
    , kEndAction = Action.create('PortConnectSpec.StartAction', kEndWorker);
  var portConnect;

  beforeEach(function() {portConnect = PortConnect.create();});

  it('should be able to be created', function(){assert(existy(portConnect));});
  
  describe('beginConnecting', function(){
    it('should set isConnecting to true', function(){
      portConnect.beginConnecting();
      portConnect.isConnecting.should.be.true;
    });

    it('should retain the given startPort', function(){
      portConnect.beginConnecting(PF.OutputPort);
      existy(portConnect.startPort).should.be.true;
      portConnect.startPort.should.equal(PF.OutputPort);
    });

    it('should retain the given frame', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame);
      existy(portConnect.startFrame);
      portConnect.startFrame.should.equal(GF.Frame);
    });

    it('should retain the given action', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame, kStartAction);
      existy(portConnect.startAction);
      portConnect.startAction.should.equal(kStartAction);
    });
  });

  describe('endConnecting', function(){
    it('should set isConnecting to false', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame, kStartAction);
      portConnect.endConnecting(PF.InputPort, GF.Frame, kEndAction);
      portConnect.isConnecting.should.be.false;
    });

    it('should retain the given port', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame, kStartAction);
      portConnect.endConnecting(PF.InputPort, GF.Frame, kEndAction);
      existy(portConnect.endPort).should.be.true;
      portConnect.endPort.should.equal(PF.InputPort);
    });

    it('should retain the given frame', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame, kStartAction);
      portConnect.endConnecting(PF.InputPort, GF.Frame, kEndAction);
      existy(portConnect.endFrame).should.be.true;
      portConnect.endFrame.should.equal(GF.Frame);
    });

    it('should retain the given action', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame, kStartAction);
      portConnect.endConnecting(PF.InputPort, GF.Frame, kEndAction);
      existy(portConnect.endAction).should.be.true;
      portConnect.endAction.should.equal(kEndAction);
    });

    it('should set both of the connected ports isConnected to true', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame, kStartAction);
      portConnect.endConnecting(PF.InputPort, GF.Frame, kEndAction);
      PF.OutputPort.isConnected.should.be.true;
      PF.InputPort.isConnected.should.be.true;
    });

    it('should connect the start and end actions', function(){
      portConnect.beginConnecting(PF.OutputPort, GF.Frame, kStartAction);
      portConnect.endConnecting(PF.InputPort, GF.Frame, kEndAction);
      existy(kStartAction.nextAction).should.be.true;
      kStartAction.nextAction.should.equal(kEndAction);
    });
  });
});
