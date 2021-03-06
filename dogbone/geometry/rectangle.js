if (typeof module !== 'undefined') {
  var util = require('util');
  var Point = require('./point.js')
    , Size = require('./size.js');
  module.exports = Rectangle;
}

function Rectangle(x, y, width, height) {
  var that = {
    get origin(){return _origin;},
    get size(){return _size;},
    get x(){return _origin.x;},
    get y(){return _origin.y;},
    get width(){return _size.width;},
    get height(){return _size.height;}, 
    get left(){return _origin.x;}, 
    get top(){return _origin.y;}, 
    get right(){return _origin.x + _size.width;}, 
    get bottom(){return _origin.y + _size.height;},
    get center(){
      var cX = that.size.width / 2;
      var cY = that.size.height / 2;
      return Point.create(that.origin.x + cX, that.origin.y + cY);
    }
  };

  that.create = function(x, y, width, height) {return new Rectangle(x, y, width, height);};
  that.clone = function() {return Rectangle.create(that.x, that.y, that.width, that.height);};

  that.contains = function(point) {
    var okX = (point.x >= _origin.x && point.x <= _origin.x + _size.width)
    var okY = (point.y >= that.y && point.y <= _origin.y + _size.height);
    return okX && okY;
  } 
  
  that.intersect = function(rectangle) { 
    result = !(rectangle.left > that.right ||  
             rectangle.right < that.left ||  
             rectangle.top > that.bottom || 
             rectangle.bottom < that.top); 
    return result; 
  } 

  that.growBy = function(amount) {
    _origin.translate(-amount);
    _size.growBy(amount);
    return that;
  }

  that.shrinkBy = function(amount) {
    _origin.translate(amount);
    _size.shrinkBy(amount);
    return that;
  }

  that.moveTo = function(x, y) {_origin.moveTo(x, y);};
  that.moveToPoint = function(point) {_origin.moveToPoint(point);};
  that.resize = function(newSize) {_size = newSize.clone();}

  that.debugString = function() {
    return "[" + _origin.debugString() + "; " + _size.debugString() + "]";
  };
  that.jsonString = function() {return JSON.stringify(that);};

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
Rectangle.createWithCanvas = function(canvas) {
  return Rectangle.create(0, 0, canvas.width, canvas.height);
};
Rectangle.createFromSpec = function(spec) {
  return Rectangle.create(spec.origin.x, spec.origin.y, spec.size.width, spec.size.height);
}
Rectangle.createFromJSON = function(rectJSON) {
  return Rectangle.createFromSpec(JSON.parse(rectJSON));
};

makeRectangle = function(x, y, width, height){return Rectangle.create(x, y, width, height);};
makeRectangleFromJSON = function(rectJSON){return Rectangle.createFromJSON(rectJSON);};
rectangleToJSON = function(rectangle){return rectangle.jsonString();};

Rectangle.Empty = Rectangle.create(0, 0, 0, 0);
