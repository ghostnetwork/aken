var ZORDER_TOP        = Number.MAX_VALUE;
var ZORDER_MIDDLE     = 0;
var ZORDER_BOTTOM     = Number.MIN_VALUE;

function Shape(frame) {
  var that = {
    get frame(){return _frame;},
    get bounds(){return _frame.size;},
    get pubsub(){return _pubsub;}
  };

  that.backgroundColor = colorWithAlpha('#FFFFFF', 1.0);
  that.zOrder = ZORDER_MIDDLE;

  that.render = function(graphics){
    clearBackground(graphics, that.frame);
    that.onRender(graphics);
  };
  that.onRender = function(graphics){};

  that.hitTest = function(point) {
    var result = _frame.contains(point);
    if (result) that.pubsub.publish('touched', that);
    return result;
  };
  that.onTouched = function(){console.log('onTouch()');};

  function clearBackground(graphics, frame) {graphics.clearRect(frame);}

  var _frame = frame
    , _pubsub = PubSub.create();

  that.pubsub.subscribe('touched', that.onTouched);
  return that;
}

Shape.create = function(frame){return new Shape(frame);};
Shape.prototype = new Shape();
