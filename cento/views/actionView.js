
function ActionView(frame, label, action, wantsPorts) {
  var that = CentoView.create(frame);

  that.label = label;
  that.isConnectable = function(){return true;};

  that.enableInputPort = function() {
    if (_.isFunction(_action.enableInputPort)) {
      _action.enableInputPort(0);
      attachInputPortToView(_action.inputPort);
    }
  }

  that.enableOutputPort = function() {
    if (_.isFunction(_action.enableOutputPort)) {
      _action.enableOutputPort(0);
      attachOutputPortToView(_action.outputPort);
    }
  }
  
  that.onTouch = function() {
    if (existy(action)) {
      invokeAction(action, that);
    }
  };

  that.onWillRemove = function() {
    console.log('removing: ' + that.name);
    that.action.markForDeletion();
    markSegmentViewForDeletion(that.inputSegmentView);
    markSegmentViewForDeletion(that.outputSegmentView);
  };

  function markSegmentViewForDeletion(segmentView) {
    if (typeof segmentView != 'undefined' && existy(segmentView)) {
      segmentView.markForDeletion();
    }
  }

  function attachInputPortToView(inputPort) {
    var frameCenter = frame.center;
    var w = 10;
    var h = 10;
    var x = frame.origin.x - w;
    var y = frameCenter.y - (h / 2);
    var inputPortFrame = Rectangle.create(x, y, w, h);
    _inputPortView = createAndAddPortView(inputPortFrame, inputPort);
  }

  function attachOutputPortToView(outputPort) {
    var frameCenter = frame.center;
    var w = 10;
    var h = 10;
    var x = frame.right;
    var y = frameCenter.y - (h / 2);
    var outputPortFrame = Rectangle.create(x, y, w, h);
    _outputPortView = createAndAddPortView(outputPortFrame, outputPort);
  }

  function createAndAddPortView(portFrame, port) {
    var portView = PortView.create(portFrame, port, that);
    portView.name = port.name;
    portView.makeUndraggable();

    portView.onTouch = function() {}

    that.addChild(portView);
    return portView;
  }

  var _action = action
    , _inputPortView
    , _outputPortView
    , _inputSegmentView
    , _outputSegmentView
    , _hasPorts = wantsPorts;
  
  Object.defineProperty(that, 'action', {get : function() {return _action;},enumerable : true});
  Object.defineProperty(that, 'inputPortView', {get : function() {return _inputPortView;},enumerable : true});
  Object.defineProperty(that, 'outputPortView', {get : function() {return _outputPortView;},enumerable : true});
  Object.defineProperty(that, 'inputSegmentView', {get : function() {return _inputSegmentView;},enumerable : true});
  Object.defineProperty(that, 'outputSegmentView', {get : function() {return _outputSegmentView;},enumerable : true});
  Object.defineProperty(that, 'hasPorts', {get : function() {return _hasPorts;},enumerable : true});

  function configure() {
    if (wantsPorts) {
      that.enableInputPort();
      that.enableOutputPort();
    }

    function guidForPortView(portView) {
      var guid = null;
      if (typeof portView != 'undefined' && existy(portView)) {
        if (typeof portView.port != 'undefined') {
          guid = portView.port.guid;
        }
      }
      return guid;
    }

    PortConnect.global.on(kPortConnectDidAutoConnect, function(spec) {
      if (spec.sourceView === that) {
        _outputSegmentView = spec.segmentView;
        console.log('\n' + that.name + '.' + kPortConnectDidAutoConnect 
          + '\n       source: ' + spec.sourceView.name
          + '\n       inputPort:' + guidForPortView(spec.sourceView.inputPortView)
          + '\n      outputPort:' + guidForPortView(spec.sourceView.outputPortView)
          + '\n            --> :' + _outputSegmentView.connector.startPort.guid
          + '\n  segmentView: ' 
          + '\n      startPort: ' + spec.segmentView.connector.startPort.guid
          + '\n        endPort: ' + spec.segmentView.connector.endPort.guid);
      }
      else if (spec.destView === that) {
        _inputSegmentView = spec.segmentView;
        console.log('\n' + that.name + '.' + kPortConnectDidAutoConnect 
          + '\n         dest:' + spec.destView.name
          + '\n       inputPort:' + guidForPortView(spec.destView.inputPortView)
          + '\n      outputPort:' + guidForPortView(spec.destView.outputPortView)
          + '\n            <-- :' + _inputSegmentView.connector.startPort.guid
          + '\n  segmentView: '
          + '\n      startPort: ' + spec.segmentView.connector.startPort.guid
          + '\n        endPort: ' + spec.segmentView.connector.endPort.guid);
      }
    });
  }
  configure();
  return that;
}

ActionView.create = function(frame, label, action){return new ActionView(frame, label, action, true);};
ActionView.createWithNoPorts = function(frame, label, action){return new ActionView(frame, label, action, false);};


if (typeof module !== 'undefined') {
  module.exports = ActionView;
  var util = require('util')
    , _ = require('underscore')
    , PubSub = require('../../verdoux/pubSub.js')
    , View = require('../../dogbone/views/view.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , Action = require('../kernel/action.js')
    , InputPort = require('../kernel/ports/inputPort.js')
    , OutputPort = require('../kernel/ports/outputPort.js')
    , PortView = require('./portView.js')
    , CentoView = require('./centoView.js');
}
ActionView.Empty = ActionView.create(Rectangle.Empty, 'ActionView.Empty', Action.None);
