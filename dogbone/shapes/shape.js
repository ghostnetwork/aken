if (typeof module !== 'undefined') {
  module.exports = Shape;
  var Graphics = require('../graphics.js')
    , PubSub = require('../../verdoux/pubsub.js');
}

var kShapeMoved       = "shape.moved";

var ZORDER_TOP        = Number.MAX_VALUE;
var ZORDER_MIDDLE     = 0;
var ZORDER_BOTTOM     = Number.MIN_VALUE;

function Shape(frame) {
  var that = {
    get frame(){return _frame;},
    get bounds(){return _frame.size;},
    get pubsub(){return _pubsub;},
    get isDraggable(){return _draggable;},
    get isSelected(){return _selected;},
    get isSelectable(){return _selectable;}
  };

  var backgroundColor = colorWithAlpha('#FFFFFF', 1.0);
  var highlightBgColor = colorWithAlpha('#c7c70000', 1.0);
  that.zOrder = ZORDER_MIDDLE;

  that.hitTest = function(point) {return existy(_frame) ? _frame.contains(point) : false;};
  that.renderShape = function(graphics){
    clearBackground(graphics, that.frame);
    that.onRender(graphics);
  };

  that.resizeFrame = function(newFrame) {_frame = newFrame.clone();};

  that.makeDraggable = function() {_draggable = true;};
  that.makeUndraggable = function() {_draggable = false;};
 
  that.select = function(){_selected = true;};
  that.unselect = function(){_selected = false;};

  that.makeSelectable = function(){
    _selectable = true;
    console.log(that.frame.debugString() + '.isSelectable: ' + that.isSelectable);
  };
  that.makeUnselectable = function(){_selectable = false;};
  
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
  that.onSelectionChanged = function(selected){
    if (that.isSelectable) {
      if (selected) {
        that.select();
        that.borderColor = colorWithAlpha('#c7000000', 1.0);
      }
      else {
        that.unselect();
        that.clearBorderColor();
      }
    }
  };

  function clearBackground(graphics, frame) {graphics.clearRect(frame);}
  function restoreSavedBgColor() {
    if (existy(origBgColor)) {
      that.backgroundColor = origBgColor;
      origBgColor = null;
    }
  }
 
  function configure(){
    _pubsub.on(kDogboneSelectionChanged, function(selected) {
      that.onSelectionChanged(selected);
    });
  }

  var origBgColor;

  var _frame = frame
    , _pubsub = PubSub.create()
    , _draggable = true
    , _selectable = true
    , _selected = false;
 
  configure();

  return that;
}

Shape.create = function(frame){return new Shape(frame);};
