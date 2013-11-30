
function DownTriangleView(frame) {
  var that = TriangleView.create(frame);

  that.buildPoints = function(points) {
    var x = that.frame.left;
    var y = that.frame.top;
    points.push(Point.create(x,y));

    x = that.frame.right;
    y = that.frame.top;
    points.push(Point.create(x,y));

    x = that.frame.center.x;
    y = that.frame.bottom;
    points.push(Point.create(x,y));

    x = that.frame.left;
    y = that.frame.top
    points.push(Point.create(x,y));
  }
  
  return that;
}

DownTriangleView.create = function(frame){return new DownTriangleView(frame);};

if (typeof module !== 'undefined') {
  module.exports = DownTriangleView;
  var util = require('util');
  var Graphics = require('../graphics.js')
    , TriangleView = require('./triangleView.js');
}
