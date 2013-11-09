function ActionView(frame, action) {
  var that = View.create(frame);

  that.onTouch = function() {action(that);};
  
  Object.defineProperty(that, 'action', {get : function() {return _action;},enumerable : true});
  var _action = action;
  return that;
}

ActionView.create = function(frame, action){return new ActionView(frame, action);};

if (typeof module !== 'undefined') {
  module.exports = ActionView;
  var util = require('util')
    , View = require('../../../dogbone/views/view.js');
}