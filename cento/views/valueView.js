    
function ValueView(frame, value) {
  var that = ActionView.createWithNoPorts(frame, value.name, value);
  Object.defineProperty(that, 'value', {get : function() {return _value;},enumerable : true});
  that.type = 'ValueView';
  that.enableOutputPort();

  that.onMetaKeyPressed = function(dragOffset) {
    if (dragOffset.y > 0) {
      value.decrement();
    }
    else {
      value.increment();
    }
    that.label = value.toString();
  }

  var valueViewWorker = function(){return _value;};
  var _value = value;
  return that;
}

ValueView.create = function(frame, value){return new ValueView(frame, value);};
ValueView.createFromSpec = function(spec) {
  var frame = Rectangle.createFromSpec(spec.frame);
  var value = Value.createFromSpec(spec.value);
  var valueView = ValueView.create(frame, value);

  // In our case we don't want to call viewFromSpec() since
  // we've already added our children (the ports). Instead,
  // we'll directly call shapeFromSpec().
  valueView.shapeFromSpec(spec);

  return valueView;
};

ValueView.createFromJSON = function(valueViewJSON) {
  return ValueView.createFromSpec(ActionView.fromJSON(valueViewJSON));
};

if (typeof module !== 'undefined') {
  module.exports = ValueView;
  var util = require('util')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , Value = require('../../cento/kernel/value.js')
    , ActionView = require('./actionView.js');
}