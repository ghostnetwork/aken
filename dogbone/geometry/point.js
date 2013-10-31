function Point(x, y) {
  var that = {
    get x(){return _x;},
    get y(){return _y;}
  };

  that.create = function(x, y) {return new Point(x, y);};

  var _x = x
    , _y = y;

  return that;
}