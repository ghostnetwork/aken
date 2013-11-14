
function InputPort(number) {
  var that = PubSub.create();

  Object.defineProperty(that, 'number', {get : function() {return _number;},enumerable : true});
  Object.defineProperty(that, 'name', {get : function() {return 'Input.Port.' + that.number;},enumerable : true});
  
  var _number = number;

  return that;
}

InputPort.create = function(number){return new InputPort(number);};

if (typeof module !== 'undefined') {
  module.exports = InputPort;
  var util = require('util')
    , PubSub = require('../../../verdoux/pubsub.js');

}