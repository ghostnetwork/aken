function Size(width, height) {
  var that = {
    get width(){return _width;},
    get height(){return _height;}
  };

  that.create = function(width, height) {
    return new Size(width, height);
  };
  
  var _width = width
    , _height = height;

  return that;
}