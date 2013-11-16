
function EndProgramView(frame, label, action) {
  var that = ActionView.createWithNoPorts(frame, label, action);
  that.enableInputPort();
  return that;
}

EndProgramView.create = function(frame, label, action){return new EndProgramView(frame, label, action);};

if (typeof module !== 'undefined') {
  module.exports = EndProgramView;
  var util = require('util')
    , ActionView = require('./actionView.js')
    , PubSub = require('../../verdoux/pubsub.js');
}
