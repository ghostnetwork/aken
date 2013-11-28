
function StartProgramView(frame, label, action) {
  var that = ActionView.createWithNoPorts(frame, label, action);
  that.enableOutputPort();
  return that;
}

StartProgramView.create = function(frame, label, action){return new StartProgramView(frame, label, action);};

StartProgramView.createFromSpec = function(spec) {
  var frame = Rectangle.createFromSpec(spec.frame);
  var label = spec.label;
  var action = Action.createFromSpec(spec.action);
  var startProgramView = StartProgramView.create(frame, label, action);
  startProgramView.shapeFromSpec(spec);
  startProgramView.viewFromSpec(spec);
  return startProgramView;
};

StartProgramView.createFromJSON = function(startProgramViewJSON) {
  return StartProgramView.createFromSpec(ActionView.fromJSON(startProgramViewJSON));
};

if (typeof module !== 'undefined') {
  module.exports = StartProgramView;
  var util = require('util')
    , ActionView = require('./actionView.js')
    , Action = require('../kernel/action.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js');
}
