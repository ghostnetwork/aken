
function StartProgramView(frame, label, action) {
  var that = ActionView.createWithNoPorts(frame, label, action);
  that.enableOutputPort();
  return that;
}

StartProgramView.create = function(frame, label, action){return new StartProgramView(frame, label, action);};

if (typeof module !== 'undefined') {
  module.exports = StartProgramView;
  var util = require('util')
    , ActionView = require('./actionView.js');
}
