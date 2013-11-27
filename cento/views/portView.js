kPortViewMoved  = 'PortView.Moved';

function PortView(frame, port, actionView) {
  var that = CentoView.create(frame);

  Object.defineProperty(that, 'port', {get : function() {return _port;},enumerable : true});
  Object.defineProperty(that, 'actionView', {get : function() {return _actionView;},enumerable : true});

  that.onMoved = function(delta) {
    var payload = {
      "delta":delta,
      "port":port
    }
    PubSub.global.publish(kPortViewMoved, payload);
  }

  function configureSubscribers() {
    PubSub.global.on(kDogboneMouseDown, function(payload) {
      if (that.hitTest(payload.mousePoint)) {
        PortConnect.global.beginConnecting(that.port, that.frame, that.actionView.action);
      }
    });

    PubSub.global.on(kDogboneMouseMove, function(payload) {
      if (that.hitTest(payload.mousePoint)) {that.backgroundColor = kPortAvailableColor;}
      else {that.backgroundColor = kPortDefaultColor;}
    });

    PubSub.global.on(kDogboneMouseUp, function(payload) {
      if (that.hitTest(payload.mousePoint)) {
        PortConnect.global.endConnecting(that.port, that.frame, that.actionView.action);
      }
    });
  }

  configureSubscribers();
  
  var kPortAvailableColor = colorWithAlpha('#00ff00', 1.0);
  var kPortDefaultColor = colorWithAlpha('#ffffff', 1.0);
  
  var _port = port
    , _actionView = actionView;

  return that;
}

PortView.create = function(frame, port, actionView){return new PortView(frame, port, actionView);};

PortView.createFromSpec = function(spec) {
  var frame = Rectangle.createFromSpec(spec.frame);
  var port = Port.createFromSpec(spec.port);
  var actionView = null;//ActionView.createFromSpec(spec.actionView);
  var portView = PortView.create(frame, port, actionView);
  portView.shapeFromSpec(spec);
  portView.viewFromSpec(spec);
  return portView;
};

PortView.createFromJSON = function(portViewJSON) {return PortView.createFromSpec(JSON.parse(portViewJSON));};

if (typeof module !== 'undefined') {
  module.exports = PortView;
  var util = require('util')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , View = require('../../dogbone/views/view.js')
    , PubSub = require('../../verdoux/pubsub.js')
    , Port = require('../kernel/ports/port.js')
    , CentoView = require('./centoView.js')
    , ActionView = require('./actionView.js');
}