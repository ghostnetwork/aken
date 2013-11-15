kPortConnectMadeConnection  = 'PortConnect.made.connection'; 

if (typeof module !== 'undefined') {
  module.exports = PortConnect;
  var util = require('util')
    , PubSub = require('../../../verdoux/pubsub.js');
}

function PortConnect() {
  var that = PubSub.create();
  
  that.beginConnecting = function(port, frame) {
    if (not(that.isConnecting)) {
      _isConnecting = true;
      _startPort = port;
      _startFrame = frame;
    }
  };

  that.endConnecting = function(port, frame) {
    _isConnecting = false; 
    _endPort = port;
    _endFrame = frame;

    that.startPort.makeConnected();
    that.endPort.makeConnected();

    var connectorSpec = {
      "startPort":that.startPort,
      "endPort":that.endPort
    };

    var segmentSpec = {
      "startPoint":that.startFrame.center,
      "endPoint":that.endFrame.center
    };
    
    var spec = {
      "connector":Connector.create(connectorSpec),
      "segment":Segment.create(segmentSpec)
    };
    that.publish(kPortConnectMadeConnection, JSON.stringify(spec));
  };

  that.autoConnect = function(sourceView, destView) {
    that.beginConnecting(sourceView.outputPort, sourceView.outputPortView.frame);
    that.endConnecting(destView.inputPort, destView.inputPortView.frame);
  }

  Object.defineProperty(that, 'isConnecting', {get : function() {
    return _isConnecting;},enumerable : true
  });
  Object.defineProperty(that, 'startPort', {get : function() {
    return _startPort;},enumerable : true
  });
  Object.defineProperty(that, 'endPort', {get : function() {
    return _endPort;},enumerable : true
  });
  Object.defineProperty(that, 'startFrame', {get : function() {
    return _startFrame;},enumerable : true
  });
  Object.defineProperty(that, 'endFrame', {get : function() {
    return _endFrame;},enumerable : true
  });

  var _isConnecting = false
    , _startPort
    , _endPort
    , _startFrame
    , _endFrame;

  return that;
}

PortConnect.create = function(){return new PortConnect();};
PortConnect.global = PortConnect.create();
