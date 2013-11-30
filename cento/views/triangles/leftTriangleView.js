
function LeftTriangleView(frame) {
  var that = TriangleView.create(frame);

  that.buildPoints = function(points) {
    var x = that.frame.right;
    var y = that.frame.top;
    points.push(Point.create(x,y));

    x = that.frame.right;
    y = that.frame.bottom;
    points.push(Point.create(x,y));

    x = that.frame.left;
    y = that.frame.center.y;
    points.push(Point.create(x,y));

    x = that.frame.right;
    y = that.frame.top
    points.push(Point.create(x,y));
  }
  
  return that;
}

LeftTriangleView.create = function(frame){return new LeftTriangleView(frame);};

if (typeof module !== 'undefined') {
  module.exports = LeftTriangleView;
  var util = require('util');
  var Graphics = require('../graphics.js')
    , TriangleView = require('./triangleView.js');
}
