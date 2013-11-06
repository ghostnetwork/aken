function Size(width, height) {
  var that = {
    get width(){return _width;},
    get height(){return _height;},
    get center(){ return Point.create(_width/2, _height/2);}
  };

  that.clone = function() {return Size.create(that.width, that.height);};

  that.growBy = function(amount) {
    _width += amount;
    _height += amount;
    return that;
  }

  that.shrinkBy = function(amount) {
    _width -= amount;
    _height -= amount;
    return that;
  };

  that.debugString = function() {return _width + ", " + _height;};

  var _width = width
    , _height = height;

  return that;
}

Size.create = function(width, height) {return new Size(width, height);};
Size.createWithCanvas = function(canvas) {return Size.create(canvas.width, canvas.height);}
Size.Empty = Size.create(0, 0);

if (typeof module !== 'undefined') {
  module.exports = Size;
  var Point = require('./point.js');
}
