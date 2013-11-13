
function InputPort(name) {
  var that = PubSub.create();

  Object.defineProperty(that, 'name', {get : function() {return _name;},enumerable : true});
  var _name = name;

  return that;
}

InputPort.create = function(name){return new InputPort(name);};

if (typeof module !== 'undefined') {
  module.exports = InputPort;
  var util = require('util')
    , PubSub = require('../../../verdoux/pubsub.js');

}