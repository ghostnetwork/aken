
function Port(number) {
  var that = PubSub.create();

  that.portFromSpec = function(spec) {
    that.number = spec.number;
    _connected = spec.isConnected;
  };

  that.makeConnected = function() {_connected = true;};
  that.makeDisconnected = function() {_connected = false;};

  Object.defineProperty(that, 'number', {get : function() {return _number;},enumerable : true});
  Object.defineProperty(that, 'isConnected', {get : function() {return _connected;},enumerable : true});
  Object.defineProperty(that, 'guid', {get : function() {return _guid;},enumerable : true});
  Object.defineProperty(that, 'name', {get : function() {
    return that.type +  'Port.' + that.number;},enumerable : true
  });
  
  var _number = number
    , _connected = false
    , _guid = guid();

  return that;
}

Port.create = function(number){return new Port(number);};

Port.createFromSpec = function(spec) {
  var port = Port.create(spec.number);
  port.portFromSpec(spec);
  return port;
};

Port.createFromJSON = function(portJSON) {return Port.createFromSpec(JSON.parse(portJSON));};

if (typeof module !== 'undefined') {
  module.exports = Port;
  var util = require('util')
    , PubSub = require('../../../verdoux/pubsub.js');
  require('../../../verdoux/guid.js');
  }