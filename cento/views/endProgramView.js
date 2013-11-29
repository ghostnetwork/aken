
function EndProgramView(frame, label, action) {
  var that = ActionView.createWithNoPorts(frame, label, action);
  that.type = 'EndProgramView';
  that.enableInputPort();
  return that;
}

EndProgramView.create = function(frame, label, action){return new EndProgramView(frame, label, action);};

EndProgramView.createFromSpec = function(spec) {
  var frame = Rectangle.createFromSpec(spec.frame);
  var label = spec.label;
  var action = Action.createFromSpec(spec.action);
  var endProgramView = EndProgramView.create(frame, label, action);
  endProgramView.viewFromSpec(spec);
  return endProgramView;
};

EndProgramView.createFromJSON = function(endProgramViewJSON) {
  return EndProgramView.createFromSpec(ActionView.fromJSON(endProgramViewJSON));
};

if (typeof module !== 'undefined') {
  module.exports = EndProgramView;
  var util = require('util')
    , ActionView = require('./actionView.js')
    , Action = require('../kernel/action.js')
    , PubSub = require('../../verdoux/pubsub.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js');
}
