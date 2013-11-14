function ActionView(frame, label, action, wantsPorts) {
  var that = View.create(frame);

  that.label = label;

  function addInputPort(inputPort) { 
    if (existy(inputPort)) {
      _inputPorts.push(inputPort);
    }
  };

  function addInputPorts(ports) {
    if (existy(ports)) {
      ports.forEach(function(port) {
        that.addInputPort(port);
      });
    }
  }

  that.onTouch = function() {
    if (existy(action))
      action(that);
  };

  function createAndAddPortView(portFrame, name) {
    var portView = View.create(portFrame);
    portView.name = name;
    portView.makeUndraggable();

    portView.onTouch = function() {}

    that.addChild(portView);
    return portView;
  }

  function attachInputPortToView(inputPort) {
    var frameCenter = frame.center;
    var w = 10;
    var h = 10;
    var x = frame.origin.x - w;
    var y = frameCenter.y - (h / 2);
    var inputPortFrame = Rectangle.create(x, y, w, h);
    createAndAddPortView(inputPortFrame, inputPort.name);
  }

  function attachOutputPortToView(outputPort) {
    var frameCenter = frame.center;
    var w = 10;
    var h = 10;
    var x = frame.right;
    var y = frameCenter.y - (h / 2);
    var outputPortFrame = Rectangle.create(x, y, w, h);
    createAndAddPortView(outputPortFrame, outputPort.name);
  }

  function configure() {
    if (wantsPorts) {
      // For now, just one InputPort & OutputPort
      _inputPort = InputPort.create(0);
      attachInputPortToView(_inputPort);

      _outputPort = OutputPort.create(0);
      attachOutputPortToView(_inputPort);
    }
  }
  
  Object.defineProperty(that, 'action', {get : function() {return _action;},enumerable : true});

  var _action = action
    , _inputPort
    , _outputPort;

  configure();
  return that;
}

ActionView.create = function(frame, label, action){return new ActionView(frame, label, action, true);};
ActionView.createWithNoPorts = function(frame, label, action){return new ActionView(frame, label, action, false);};

if (typeof module !== 'undefined') {
  module.exports = ActionView;
  var util = require('util')
    , View = require('../../../dogbone/views/view.js')
    , Rectangle = require('../../../dogbone/geometry/rectangle.js')
    , InputPort = require('../../../cento/kernel/ports/inputPort.js')
    , OutputPort = require('../../../cento/kernel/ports/outputPort.js');
}
