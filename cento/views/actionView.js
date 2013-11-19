
function ActionView(frame, label, action, hasPorts) {
  var that = CentoView.create(frame);

  that.label = label;
  that.isConnectable = function(){return true;};
  that.inputPortSegmentView = null;
  that.outputPortSegmentView = null;

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

  that.connectWith = function(otherActionView) {_nextActionView = otherActionView;};
  that.disconnect = function() {_nextActionView = undefined;};

  that.hasNextActionView = function() {
    return typeof that.nextActionView !== 'undefined'
        && that.nextActionView !== ActionView.Empty;
  };

  that.hasInputPortSegmentView = function() {
    return typeof that.inputPortSegmentView != 'undefined' 
        && existy(that.inputPortSegmentView);
  };

  that.hasOutputPortSegmentView = function() {
    return typeof that.outputPortSegmentView != 'undefined' 
        && existy(that.outputPortSegmentView);
  };

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
    , _nextActionView = ActionView.Empty;
  
  Object.defineProperty(that, 'action', {get : function() {return _action;},enumerable : true});
  Object.defineProperty(that, 'inputPortView', {get : function() {return _inputPortView;},enumerable : true});
  Object.defineProperty(that, 'outputPortView', {get : function() {return _outputPortView;},enumerable : true});
  Object.defineProperty(that, 'nextActionView', {get : function() {return _nextActionView;},enumerable : true});

  function configure() {
    if (hasPorts) {
      that.enableInputPort();
      that.enableOutputPort();

      PubSub.global.on(kDogboneWillRemoveChild, function(actionView) {
        if (actionView.isConnectable() && actionView.name === that.name) {
          console.log(actionView.name + ' - will be removed');
          if (actionView.hasInputPortSegmentView()) {
            actionView.inputPortSegmentView.markForDeletion();
          }
          if (actionView.hasOutputPortSegmentView()) {
            actionView.outputPortSegmentView.markForDeletion();
          }
        }
      });
    }
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
    , View = require('../../dogbone/views/view.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , Action = require('../kernel/action.js')
    , InputPort = require('../kernel/ports/inputPort.js')
    , OutputPort = require('../kernel/ports/outputPort.js')
    , PortView = require('./portView.js')
    , CentoView = require('./centoView.js');
}
ActionView.Empty = ActionView.create(Rectangle.Empty, 'ActionView.Empty', Action.None);
