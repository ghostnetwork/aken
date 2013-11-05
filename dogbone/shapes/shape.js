
if (typeof module !== 'undefined') {
  module.exports = Shape;
  var Graphics = require('../graphics.js')
    , colorWithAlpha = Graphics.colorWithAlpha
    , PubSub = require('../../verdoux/pubsub.js');
}

var ZORDER_TOP        = Number.MAX_VALUE;
var ZORDER_MIDDLE     = 0;
var ZORDER_BOTTOM     = Number.MIN_VALUE;

function Shape(frame) {
  var that = {
    get frame(){return _frame;},
    get bounds(){return _frame.size;},
    get pubsub(){return _pubsub;},
    get isDraggable(){return _draggable;}
  };

  that.backgroundColor = colorWithAlpha('#FFFFFF', 1.0);
  that.zOrder = ZORDER_MIDDLE;

  that.hitTest = function(point) {return existy(_frame) ? _frame.contains(point) : false;};
  that.render = function(graphics){
    clearBackground(graphics, that.frame);
    that.onRender(graphics);
  };
  that.resizeFrame = function(newFrame) {_frame = newFrame.clone();};

  that.makeUndraggable = function() {_draggable = false;};
  that.makeDraggable = function() {_draggable = true;};
  
  that.willAcceptDrop = function(item) {
    console.log('+++ ' + that.name);
    return false;
  };
  that.acceptDrop = function(item) {};

  that.onTouch = function(){};
  that.onRender = function(graphics){};

  function clearBackground(graphics, frame) {graphics.clearRect(frame);}

  var _frame = frame
    , _pubsub = PubSub.create()
    , _draggable = true;

  return that;
}

Shape.create = function(frame){return new Shape(frame);};
