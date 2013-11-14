if (typeof module !== 'undefined') {
  module.exports = Shape;
  var Graphics = require('../graphics.js')
    , PubSub = require('../../verdoux/pubsub.js')
    , Dogbone = require('../../dogbone/dogbone.js');
}

kShapeMoved       = "shape.moved";

ZORDER_TOP        = Number.MAX_VALUE;
ZORDER_MIDDLE     = 0;
ZORDER_BOTTOM     = Number.MIN_VALUE;

function Shape(frame) {
  var that = {
    get frame(){return _frame;},
    get bounds(){return _frame.size;},
    get pubsub(){return _pubsub;},
    get isDraggable(){return _draggable;},
    get isSelected(){return _selected;},
    get isSelectable(){return _selectable;}
  };

  that.backgroundColor = colorWithAlpha('#FFFFFF', 1.0);
  that.highlightBgColor = colorWithAlpha('#c7c70000', 1.0);
  that.zOrder = ZORDER_MIDDLE;
  that.label = '';

  that.hitTest = function(point) {return existy(_frame) ? _frame.contains(point) : false;};

  that.resizeFrame = function(newFrame) {_frame = newFrame.clone();};

  that.makeDraggable = function() {_draggable = true;};
  that.makeUndraggable = function() {_draggable = false;};
 
  that.select = function(){_selected = true;};
  that.unselect = function(){_selected = false;};

  that.makeSelectable = function(){
    _selectable = true;
  };
  that.makeUnselectable = function(){_selectable = false;};
  
  that.willAcceptDrop = function(item) {return false;};
  that.acceptDrop = function(item) {};

  that.onTouch = function(){};
  that.onMouseMove = function(event){};
  that.onMouseUp = function(event){};
  that.onDragEnter = function() {
    if (notExisty(origBgColor)) {
      origBgColor = that.backgroundColor;
    }
    that.backgroundColor = that.highlightBgColor;
  };
  that.onDragExit = function() {restoreSavedBgColor();};
  that.onDragEnd = function() {restoreSavedBgColor();};
  that.onSelectionChanged = function(selected){
    if (that.isSelectable) {
      if (selected) {
        that.select();
        that.borderColor = colorWithAlpha('#ffffff', 1.0);
      }
      else {
        that.unselect();
        that.clearBorderColor();
      }
    }
  };

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
