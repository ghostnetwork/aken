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
    
  that.contains = function(point) {
    var okX = (point.x >= _origin.x && point.x <= _origin.x + _size.width)
    var okY = (point.y >= that.y && point.y <= _origin.y + _size.height);
    return okX && okY;
  }

  that.growBy = function(amount) {
    _origin.growBy(amount);
    _size.growBy(amount);
    return that;
  }

  that.shrinkBy = function(amount) {
    _origin.shrinkBy(amount);
    _size.shrinkBy(amount);
    return that;
  }

  that.debugString = function() {
    return "[" + _origin.debugString() + "; " + _size.debugString() + "]";
  };
  
  var _origin = Point.create(x, y)
    , _size = Size.create(width, height);

  return that;
}

Rectangle.create = function(x, y, width, height){return new Rectangle(x, y, width, height);};
Rectangle.createWithOriginAndSize = function(origin, size) {
  return Rectangle.create(origin.x, origin.y, size.width, size.height);
};
Rectangle.createWithSize = function(size) {
  return Rectangle.create(0, 0, size.width, size.height);
};
function makeRectangle(x, y, width, height){return Rectangle.create(x, y, width, height);};

Rectangle.Empty = Rectangle.create(0, 0, 0, 0);
