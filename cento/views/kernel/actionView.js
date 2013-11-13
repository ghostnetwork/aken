function ActionView(frame, label, action, wantsPorts) {
  var that = View.create(frame);

  that.label = label;

  that.addInputPort = function(inputPort) { 
    if (existy(inputPort))
      _inputPorts.push(inputPort);
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

  that.onRender = function(graphics) {
    renderInputPorts(graphics);
  }

  function renderInputPorts(graphics) {
    _inputPorts.forEach(function(port) {
      console.log('port.name: ' + port.name);
    });
  }

  function configure() {
    if (wantsPorts) {
      var firstPort = InputPort.create('Port.0');
      var secondPort = InputPort.create('Port.1');
      that.addInputPorts([firstPort, secondPort]);
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
