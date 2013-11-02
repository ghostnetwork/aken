function Size(width, height) {
  var that = {
    get width(){return _width;},
    get height(){return _height;}
  };

  that.debugString = function() {return _width + ", " + _height;};

  var _width = width
    , _height = height;

  return that;
}

Size.create = function(width, height) {
  return new Size(width, height);
}
