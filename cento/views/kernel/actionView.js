function ActionView(frame, label, action, wantsPorts) {
  var that = View.create(frame);

  that.label = label;

  that.addInputPort = function(inputPort) { 
    if (existy(inputPort)) {
      attachInputPortToView(inputPort);
      _inputPorts.push(inputPort);
    }
  };

  that.addInputPorts = function(ports) {
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

  function attachInputPortToView(inputPort) {
    var w = 10;
    var pad = w / 2;
    var h = w + pad;
    var x = frame.origin.x - w;
    var y = frame.origin.y + (_inputPorts.length * h) + pad;
    var inputPortFrame = Rectangle.create(x, y, w, h - pad);
    
    var portView = View.create(inputPortFrame);
    portView.name = inputPort.name;
    portView.makeUndraggable();

    portView.onTouch = function() {
      console.log(portView.name + '.onTouch()');
    }
    that.addChild(portView);
  }

  function configure() {
    if (wantsPorts) {
      var thePorts = [];
      for (var i = 0; i < 3; i++) {
        var portName = 'Port.' + i;
        thePorts.push(InputPort.create(portName));
      }
      that.addInputPorts(thePorts);
    }
  }
  
  Object.defineProperty(that, 'action', {get : function() {return _action;},enumerable : true});
  Object.defineProperty(that, 'inputPortsCount', {get : function() {return _inputPorts.length;},enumerable : true});

  var _action = action
    , _inputPorts = []
    , _outputPort;

  configure();
  return that;
}

ActionView.create = function(frame, label, action){return new ActionView(frame, label, action, true);};
ActionView.createWithNoPorts = function(frame, label, action){return new ActionView(frame, label, action, false);};

if (typeof module !== 'undefined') {
  module.exports = ActionView;
  var util = require('util')
    , View = require('../../../dogbone/views/view.js');
}
