function ActionView(frame, label, action) {
  var that = View.create(frame);
  that.label = label;
  that.onTouch = function() {action(that);};
  
  Object.defineProperty(that, 'action', {get : function() {return _action;},enumerable : true});
  var _action = action;
  return that;
}

ActionView.create = function(frame, label, action){return new ActionView(frame, label, action);};

if (typeof module !== 'undefined') {
  module.exports = ActionView;
  var util = require('util')
    , View = require('../../../dogbone/views/view.js');
}