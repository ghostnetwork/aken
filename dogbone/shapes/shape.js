var kShapeMoved       = "shape.moved";

if (typeof module !== 'undefined') {
  module.exports = Shape;
  var Graphics = require('../graphics.js')
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

  var backgroundColor = colorWithAlpha('#FFFFFF', 1.0);
  var highlightBgColor = colorWithAlpha('#c7c70000', 1.0);
  that.zOrder = ZORDER_MIDDLE;

  that.hitTest = function(point) {return existy(_frame) ? _frame.contains(point) : false;};
  that.render = function(graphics){
    clearBackground(graphics, that.frame);
    that.onRender(graphics);
  };

  that.resizeFrame = function(newFrame) {_frame = newFrame.clone();};

  that.makeUndraggable = function() {_draggable = false;};
  that.makeDraggable = function() {_draggable = true;};
  
  that.willAcceptDrop = function(item) {return false;};
  that.acceptDrop = function(item) {};

  that.onTouch = function(){};
  that.onRender = function(graphics){};
  that.onDragEnter = function() {
    if (notExisty(origBgColor)) {origBgColor = that.backgroundColor;}
    that.backgroundColor = that.highlightBgColor;
  };
  that.onDragExit = function() {restoreSavedBgColor();};
  that.onDragEnd = function() {restoreSavedBgColor();};

  function clearBackground(graphics, frame) {graphics.clearRect(frame);}
  function restoreSavedBgColor() {
    if (existy(origBgColor)) {
      that.backgroundColor = origBgColor;
      origBgColor = null;
    }
  }

  var origBgColor;

  var _frame = frame
    , _pubsub = PubSub.create()
    , _draggable = true;

  return that;
}

Shape.create = function(frame){return new Shape(frame);};
