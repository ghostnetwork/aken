    
function ValueView(frame, value) {
  var that = ActionView.create(frame, value.name, value);

  Object.defineProperty(that, 'value', {get : function() {return _value;},enumerable : true});

  that.enableOutputPort();


  var valueViewWorker = function(){return _value;};
  var _value = value;
  return that;
}

ValueView.create = function(frame, value){return new ValueView(frame, value);};

ValueView.createFromSpec = function(spec) {
  var frame = Rectangle.createFromSpec(spec.frame);
  var value = Value.createFromSpec(spec.value);
  var valueView = ValueView.create(frame, value);
  valueView.shapeFromSpec(spec);
  valueView.viewFromSpec(spec);
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