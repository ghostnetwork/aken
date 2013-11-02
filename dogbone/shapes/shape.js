var ZORDER_TOP        = Number.MAX_VALUE;
var ZORDER_MIDDLE     = 0;
var ZORDER_BOTTOM     = Number.MIN_VALUE;

function Shape(frame) {
  var that = {
    get frame(){return _frame;},
    get bounds(){return _frame.size;},
  };

  that.backgroundColor = colorWithAlpha('#FFFFFF', 1.0);
  that.zOrder = ZORDER_MIDDLE;

  that.render = function(graphics){
    clearBackground(graphics, that.frame);
    that.onRender(graphics);
  };
  that.onRender = function(graphics){};

  function clearBackground(graphics, frame) {
    graphics.clearRect(frame);
  }

  var _frame = frame;
  return that;
}

Shape.create = function(frame){return new Shape(frame);};
Shape.prototype = new Shape();
