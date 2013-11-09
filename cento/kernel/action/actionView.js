function ActionView(frame) {
  var that = View.create(frame);
  
  return that;
}

ActionView.create = function(frame){return new ActionView();};

if (typeof module !== 'undefined') {
  module.exports = ActionView;
  var util = require('util')
    , View = require('../dogbone/views/view.js');
}