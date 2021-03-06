
function Connector(spec) {
  var that = PubSub.create();

  that.debugString = function() {
    var result = '';
    result += ('\n  startPort: ' + that.startPort.name);
    result += ('\n    endPort: ' + that.endPort.name);
    return result;
  }

  Object.defineProperty(that, 'startPort', {get : function() {return _startPort;},enumerable : true});
  Object.defineProperty(that, 'endPort', {get : function() {return _endPort;},enumerable : true});

  var _name
    , _startPort = spec.startPort
    , _endPort = spec.endPort;

  return that;
}

Connector.create = function(spec){return new Connector(spec);};

Connector.createFromJSON = function(connectorJSON) {return Connector.create(JSON.parse(connectorJSON));};

if (typeof module !== 'undefined') {
  module.exports = Connector;
  var util = require('util')
    , PubSub = require('../../verdoux/pubsub.js');
}