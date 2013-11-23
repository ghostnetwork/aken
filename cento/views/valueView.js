
function ValueView(frame, value) {
  var that = ActionView.create(frame, value.name, value);

  that.enableOutputPort();

  Object.defineProperty(that, 'value', {get : function() {return _value;},enumerable : true});

  var valueViewWorker = function(){return _value;};
  var _value = value;
  return that;
}

ValueView.create = function(frame, value){return new ValueView(frame, value);};

if (typeof module !== 'undefined') {
  module.exports = ValueView;
  var util = require('util')
    , ActionView = require('../../cento/views/actionView.js')
    , Action = require('../../cento/kernel/action.js');
}