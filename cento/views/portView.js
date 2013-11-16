kPortViewMoved  = 'PortView.Moved';

function PortView(frame, port, actionView) {
  var that = View.create(frame);

  that.connectedTo = undefined;

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

  Object.defineProperty(that, 'port', {get : function() {return _port;},enumerable : true});
  Object.defineProperty(that, 'actionView', {get : function() {return _actionView;},enumerable : true});
  
  var _port = port
    , _actionView = actionView;

  return that;
}

PortView.create = function(frame, port, actionView){return new PortView(frame, port, actionView);};

if (typeof module !== 'undefined') {
  module.exports = PortView;
  var util = require('util')
    , View = require('../../dogbone/views/view.js')
    , PubSub = require('../../verdoux/pubsub.js');
}