function Point(x, y) {
  var that = {
    get x(){return _x;},
    get y(){return _y;}
  };

  that.translate = function(amount) {
    _x += amount;
    _y += amount;
  };
  that.debugString = function() {return _x + ", " + _y;};

  var _x = x
    , _y = y;

  return that;
}

Point.create = function(x, y){return new Point(x,y);};
Point.createFromMouseEventWithClientCoords = function(event) {return Point.create(event.clientX, event.clientY);};
Point.createFromMouseEventWithPageCoords = function(event) {return Point.create(event.pageX, event.pageY);};
Point.createFromMouseEventWithScreenCoords = function(event) {return Point.create(event.screenX, event.screenY);};

Point.Empty = Point.create(0, 0);

if (typeof module !== 'undefined') {module.exports = Point;}
