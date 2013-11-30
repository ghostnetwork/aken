
function RightTriangleView(frame) {
  var that = TriangleView.create(frame);

  that.buildPoints = function(points) {
    var x = that.frame.left;
    var y = that.frame.top;
    points.push(Point.create(x,y));

    x = that.frame.right;
    y = that.frame.center.y;
    points.push(Point.create(x,y));

    x = that.frame.left;
    y = that.frame.bottom;
    points.push(Point.create(x,y));

    x = that.frame.left;
    y = that.frame.top
    points.push(Point.create(x,y));
  }
  
  return that;
}

RightTriangleView.create = function(frame){return new RightTriangleView(frame);};

if (typeof module !== 'undefined') {
  module.exports = RightTriangleView;
  var util = require('util');
  var Graphics = require('../graphics.js')
    , TriangleView = require('./triangleView.js');
}
