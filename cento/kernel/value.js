
function Value(value) {
  var that = Action.create(normalize(value).toString());

  that.toString = function() {return that.name;};

  function normalize(x) {
    if (typeof x === 'undefined')
      x = 0;
    return x;
  }

  Object.defineProperty(that, 'value', {get : function() {return _value;},enumerable : true});
  
  var _value = normalize(value);
  return that;
}

Value.create = function(value){return new Value(value);};

if (typeof module !== 'undefined') {
  module.exports = Value;
  var util = require('util')
    , Action = require('./action.js')
    , PubSub = require('../../verdoux/pubsub.js');
}
