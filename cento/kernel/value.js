
function Value(value) {
  var that = Action.create(normalize(value).toString(), actionWorker);

  that.increment = function(){_value++; return that;};
  that.decrement = function(){_value--; return that;};
  that.adjustBy = function(amount){_value += amount; return that;};

  that.toString = function() {return _value.toString();};

  function normalize(x) {
    if (typeof x === 'undefined')
      x = 0;
    return x;
  }

  function actionWorker() {return that.value;};

  Object.defineProperty(that, 'value', {get : function() {return _value;},enumerable : true});
  
  var _value = normalize(value);
  return that;
}

Value.create = function(value){return new Value(value);};

Value.createFromSpec = function(spec) {
  var value = Value.create(spec.value);
  value.actionFromSpec(spec);
  return value;
};

Value.createFromJSON = function(valueJSON) {return Value.createFromSpec(JSON.parse(valueJSON));};

if (typeof module !== 'undefined') {
  module.exports = Value;
  var util = require('util')
    , Action = require('./action.js')
    , PubSub = require('../../verdoux/pubsub.js');
}
