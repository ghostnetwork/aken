function Point(x, y) {
  var that = {
    get x(){return _x;},
    get y(){return _y;}
  };

  that.growBy = function(amount) {
    _x += amount;
    _y += amount;
  }

  that.shrinkBy = function(amount) {
    _x -= amount;
    _y -= amount;
  }

  that.debugString = function() {return _x + ", " + _y;};

  var _x = x
    , _y = y;

  return that;
}

Point.create = function(x, y){return new Point(x,y);};
Point.createFromMouseEvent = function(event) {return Point.create(event.pageX, event.pageY);};

Point.Empty = Point.create(0, 0);

if (typeof module !== 'undefined') {
  module.exports = Point;
  
  // var Point = require('../dogbone/geometry/point.js')
  //   , Rectangle = require('../dogbone/geometry/rectangle.js')
  //   , View = require('../dogbone/views/view.js');
}
