
function SegmentView(segment) {
  var that = View.create();
  
  var kSegmentColor = colorWithAlpha('#ff0000', 1.0);

  that.render = function(graphics) {
    graphics.drawLine(
        that.segment.startPoint.x
      , that.segment.startPoint.y
      , that.segment.endPoint.x
      , that.segment.endPoint.y
      , kSegmentColor)
  };

  Object.defineProperty(that, 'segment', {get : function() {return _segment;},enumerable : true});
  
  var _segment = segment;
  return that;
}

SegmentView.create = function(segment){return new SegmentView(segment);};

if (typeof module !== 'undefined') {
  module.exports = SegmentView;
  var util = require('util')
    , View = require('../../dogbone/views/view.js')
    , Segment = require('../../cento/kernel/geometry/segment.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , PortConnect = require('../../cento/kernel/ports/portConnect.js')
    , PubSub = require('../../verdoux/pubsub.js');
}