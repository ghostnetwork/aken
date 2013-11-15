
function SegmentView(segment, connector) {
  var that = View.create(frameForSegment(segment));
  
  var kSegmentColor = colorWithAlpha('#ff0000', 1.0);

  that.render = function(graphics) {
    graphics.drawLine(
        that.segment.startPoint.x
      , that.segment.startPoint.y
      , that.segment.endPoint.x
      , that.segment.endPoint.y
      , kSegmentColor);
  };

  that.onMoved = function(delta) {
    var x = segment.startPoint.x + delta.x;
    var y = segment.startPoint.y + delta.y;
    segment.startPoint.moveTo(x, y);

    x = segment.endPoint.x + delta.x;
    y = segment.endPoint.y + delta.y;
    segment.endPoint.moveTo(x, y);
  }

  function frameForSegment(segment) {
    var origin = segment.startPoint
      , width = segment.endPoint.x - origin.x
      , height = segment.endPoint.y - origin.y
      , size = Size.create(width, height);
    return Rectangle.createWithOriginAndSize(origin, size);
  }

  PubSub.global.on(kPortViewMoved, function(spec) {
    if (spec.port.name === connector.startPort.name) {
      if (spec.port.isConnected) {
        var x = segment.startPoint.x + spec.delta.x;
        var y = segment.startPoint.y + spec.delta.y;
        segment.startPoint.moveTo(x, y);
      }
    }
    else if (spec.port.name === connector.endPort.name) {
      if (spec.port.isConnected) {
        var x = segment.endPoint.x + spec.delta.x;
        var y = segment.endPoint.y + spec.delta.y;
        segment.endPoint.moveTo(x, y);
      }
    }
  });

  Object.defineProperty(that, 'segment', {get : function() {return _segment;},enumerable : true});
  Object.defineProperty(that, 'connector', {get : function() {return _connector;},enumerable : true});

  var _segment = segment
    , _connector = connector;

  return that;
}

SegmentView.create = function(segment, connector){
  return new SegmentView(segment, connector);
};

if (typeof module !== 'undefined') {
  module.exports = SegmentView;
  var util = require('util')
    , View = require('../../dogbone/views/view.js')
    , Segment = require('../../cento/kernel/geometry/segment.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , PortConnect = require('../../cento/kernel/ports/portConnect.js')
    , PubSub = require('../../verdoux/pubsub.js');
}