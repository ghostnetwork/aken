
function ValueView(frame, label, value) {
  var that = ActionView.create(frame, label, Action.create(label, valueViewWorker));

  that.enableOutputPort();

  Object.defineProperty(that, 'value', {get : function() {return _value;},enumerable : true});

  var valueViewWorker = function(){return _value;};
  var _value = value;
  return that;
}

ValueView.create = function(frame, label, value){return new ValueView(frame, label, value);};

if (typeof module !== 'undefined') {
  module.exports = ValueView;
  var util = require('util')
    , ActionView = require('../../cento/views/actionView.js')
    , Action = require('../../cento/kernel/action.js');
}