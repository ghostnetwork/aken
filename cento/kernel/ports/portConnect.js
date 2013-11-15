kPortConnectMadeConnection  = 'PortConnect.made.connection'; 

if (typeof module !== 'undefined') {
  module.exports = PortConnect;
  var util = require('util')
    , PubSub = require('../../../verdoux/pubsub.js');
}

function PortConnect() {
  var that = PubSub.create();
  
  that.beginConnecting = function(port) {
    if (not(that.isConnecting)) {
      _isConnecting = true;
      _startPort = port;
    }
  };

  that.endConnecting = function(port) {
    _isConnecting = false; 
    _endPort = port;

    var spec = {
      "startPort":that.startPort,
      "endPort":that.endPort
    }
    var connector = Connector.create(spec);
    that.publish(kPortConnectMadeConnection, connector);
  };

  Object.defineProperty(that, 'isConnecting', {get : function() {
    return _isConnecting;},enumerable : true
  });
  Object.defineProperty(that, 'startPort', {get : function() {
    return _startPort;},enumerable : true
  });
  Object.defineProperty(that, 'endPort', {get : function() {
    return _endPort;},enumerable : true
  });

  var _isConnecting = false
    , startPort
    , endPort;

  return that;
}

PortConnect.create = function(){return new PortConnect();};
PortConnect.global = PortConnect.create();
