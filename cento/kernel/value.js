
function Value(value) {
  var that = Action.create('Value.' + value);

  that.toString = function() {return that.name;};
  
  Object.defineProperty(that, 'value', {get : function() {return _value;},enumerable : true});
  
  var _value = value;
  return that;
}

Value.create = function(value){return new Value(value);};

if (typeof module !== 'undefined') {
  module.exports = Value;
  var util = require('util')
    , Action = require('./action.js')
    , PubSub = require('../../verdoux/pubsub.js');
}
