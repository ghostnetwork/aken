
function SegmentView(segment, connector) {
  var kSegmentColor = colorWithAlpha('#ff0000', 1.0);

  var that = CentoView.create(frameForSegment(segment));

  Object.defineProperty(that, 'segment', {get : function() {return _segment;},enumerable : true});
  Object.defineProperty(that, 'connector', {get : function() {return _connector;},enumerable : true});
  Object.defineProperty(that, 'isMarkedForDeletion', {get : function() {return _markedForDeletion;},enumerable : true});

  that.zOrder = -1000;

  that.segmentViewFromSpec = function(spec) {
    _segment = Segment.createFromSpec(spec.segment);
    _connector = Connector.createFromSpec(spec.connector);
    _markedForDeletion = spec.isMarkedForDeletion;
  }

  that.render = function(graphics) {
    graphics.drawLine(
        that.segment.startPoint.x
      , that.segment.startPoint.y
      , that.segment.endPoint.x
      , that.segment.endPoint.y
      , kSegmentColor);
  };

  that.markForDeletion = function() {_markedForDeletion = true;};

  that.debugString = function() {
    return 'start: [' 
          + that.segment.startPoint.debugString() + '] ('
          + that.connector.startPort.guid + ') end: ['
          + that.segment.endPoint.debugString() + '] ('
          + that.connector.endPort.guid + ')';
  }

  function frameForSegment(segment) {
    var origin = segment.startPoint
      , width = segment.endPoint.x - origin.x
      , height = segment.endPoint.y - origin.y
      , size = Size.create(width, height);
    return Rectangle.createWithOriginAndSize(origin, size);
  }

  PubSub.global.on(kPortViewMoved, function(spec) {
    if (spec.port.guid === connector.startPort.guid) {
      if (spec.port.isConnected) {
        var x = segment.startPoint.x + spec.delta.x;
        var y = segment.startPoint.y + spec.delta.y;
        segment.startPoint.moveTo(x, y);
      }
    }
    else if (spec.port.name === connector.endPort.name) {
      if (spec.port.guid === connector.endPort.guid) {
        if (spec.port.isConnected) {
          var x = segment.endPoint.x + spec.delta.x;
          var y = segment.endPoint.y + spec.delta.y;
          segment.endPoint.moveTo(x, y);
        }
      }
    }
  });

  var _segment = segment
    , _connector = connector
    , _markedForDeletion = false;;

  return that;
}

SegmentView.create = function(segment, connector){return new SegmentView(segment, connector);};

SegmentView.createFromSpec = function(spec) {
  var segment = Segment.createFromSpec(spec.segment);
  var connector = Connector.create(spec.connector);
  var segmentView = SegmentView.create(segment, connector);
  segmentView.shapeFromSpec(spec);
  segmentView.viewFromSpec(spec);
  return segmentView;
};

SegmentView.createFromJSON = function(segmentViewJSON) {return SegmentView.createFromSpec(JSON.parse(segmentViewJSON));};

SegmentView.isSegmentView = function(view) {
  var result = false;
  if (typeof view != 'undefined' && existy(view)) {
    result = _.isFunction(view.markForDeletion);
  }
  return result;
}

if (typeof module !== 'undefined') {
  module.exports = SegmentView;
  var util = require('util')
    , View = require('../../dogbone/views/view.js')
    , Segment = require('../../cento/kernel/geometry/segment.js')
    , Connector = require('../../cento/kernel/connector.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , Size = require('../../dogbone/geometry/size.js')
    , PortConnect = require('../../cento/kernel/ports/portConnect.js')
    , PubSub = require('../../verdoux/pubsub.js')
    , CentoView = require('./centoView.js');
}