
function TriangleView(frame) {
  var that = View.create(frame);
  var outlineColor = colorWithAlpha('#888888', 1.0);
  var triangleColor = colorWithAlpha('#00c7c7', 1.0);

  that.shouldDrawOutline = false;

  that.type = 'TriangleView';

  that.renderBackground = function(graphics){
    if (that.shouldDrawOutline)
      graphics.dashRect(that.frame, outlineColor);
  };

  that.onRender = function(graphics) {
    var points = [];
    var x = that.frame.center.x;
    var y = that.frame.top;
    points.push(Point.create(x,y));

    x = that.frame.right;
    y = that.frame.bottom;
    points.push(Point.create(x,y));

    x = that.frame.left;
    y = that.frame.bottom;
    points.push(Point.create(x,y));

    x = that.frame.center.x;
    y = that.frame.top
    points.push(Point.create(x,y));

    graphics.drawTriangle(points, triangleColor);
  };
  
  return that;
}

TriangleView.create = function(frame){return new TriangleView(frame);};

if (typeof module !== 'undefined') {
  module.exports = TriangleView;
  var util = require('util');
  var Graphics = require('../graphics.js')
    , View = require('../view.js');
}
