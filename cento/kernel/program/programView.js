
function ProgramView(frame) {
  var that = View.create(frame);
  
  return that;
}

ProgramView.create = function(frame){return new ProgramView();};

if (typeof module !== 'undefined') {
  module.exports = ProgramView;
  var util = require('util')
    , View = require('../dogbone/views/view.js');
}