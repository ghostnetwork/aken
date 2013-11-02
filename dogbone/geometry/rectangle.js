function Rectangle(x, y, width, height) {
  var that = {
    get origin(){return _origin;},
    get size(){return _size;},
    get x(){return _origin.x;},
    get y(){return _origin.y;},
    get width(){return _size.width;},
    get height(){return _size.height;}
  };

  that.create = function(x, y, width, height) {
    return new Rectangle(x, y, width, height);
  };

  that.debugString = function() {
    return "[" + _origin.debugString() + "; " + _size.debugString() + "]";
  };
  
  var _origin = Point.create(x, y)
    , _size = Size.create(width, height);

  return that;
}

Rectangle.create = function(x, y, width, height){return new Rectangle(x, y, width, height);};
function makeRectangle(x, y, width, height){return Rectangle.create(x, y, width, height);};
