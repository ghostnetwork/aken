function Point(x, y) {
  var that = {
    get x(){return _x;},
    get y(){return _y;}
  };

  that.debugString = function() {return _x + ", " + _y;};

  var _x = x
    , _y = y;

  return that;
}

Point.create = function(x, y){return new Point(x,y);};
