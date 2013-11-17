kDogboneMainViewName      = 'Dogbone'; 
kDogboneMouseDown         = 'dogbone.mousedown'; 
kDogboneMouseMove         = 'dogbone.mousemove'; 
kDogboneMouseUp           = 'dogbone.mouseup'; 
kDogboneSelectionChanged  = 'dogbone.selection.changed';
kDogboneRemovedChild      = 'dogbone.removed.child';
kDeleteKey                = 46;

function Dogbone(canvas) {
  var that = PubSub.create();

  Object.defineProperty(that, 'graphics', 
    {get : function() {return _graphics;},enumerable : true});
  Object.defineProperty(that, 'gameLoop', 
    {get : function() {return _gameLoop;},enumerable : true});
  Object.defineProperty(that, 'mainView', 
    {get : function() {return _mainView;},enumerable : true});
  Object.defineProperty(that, 'childCount', 
    {get : function() {return _mainView.childCount;},enumerable : true});
  Object.defineProperty(that, 'dragdrop', 
    {get : function() {return _dragdrop;},enumerable : true});

  that.selectionFrameColor = colorWithAlpha('#333333', 1.0);
  that.lineColor = colorWithAlpha('#ff0000', 1.0);
  
  // Public API
  that.start = function() {_gameLoop.start();};
  that.stop = function() {_gameLoop.stop();};

  that.addChild = function(child) { 
    that.mainView.addChild(child);
    return that;
  };

  that.removeChild = function(child) {
    PubSub.global.publish(kDogboneRemovedChild, child);
    that.mainView.removeChild(child);
    return that;
  }

  // Update / Render
  function updateAndRender() {
    update();
    render();
  }

  function update() {that.mainView.update();}

  function render() {
    clearDisplay();
    that.mainView.render(_graphics);

    if (Math.abs(selectionFrame.size.width) > 0 && Math.abs(selectionFrame.size.height) > 0) {
      if (shouldDrawLine) {
        _graphics.drawLine(selectionFrame.origin.x, 
                           selectionFrame.origin.y, 
                           selectionFrame.origin.x + selectionFrame.size.width,
                           selectionFrame.origin.y + selectionFrame.size.height,
                           that.lineColor);
      }
      else {
        _graphics.drawRect(selectionFrame, that.selectionFrameColor);
      }
    }
  }

  function clearDisplay() {_graphics.clearRect(canvasFrame);}

  // Mouse Events
  function configureMouseListeners() {
    if (mouseListenersConfigured) {return;}
    mouseListenersConfigured = true;

    canvas.addEventListener('mousedown', function(event) {onMouseDown(event);});
    canvas.addEventListener('mousemove', function(event) {onMouseMove(event);});
    canvas.addEventListener('mouseup', function(event) {onMouseUp(event);});

    if (typeof window !== 'undefined')
      window.addEventListener('keyup', function(event) {onKeyUp(event);});
  }

  function onMouseDown(event) {
    shouldDrawLine = false;
    startPoint = Point.createFromMouseEventWithPageCoords(event);
    that.mainView.frameContainsPoint(startPoint, frameContainsPointCallback);

    maybeClearSelection(event);
    publishDogboneMouseDownEvent();
    publishTargetSelectionChangedEvent();
  }

  function frameContainsPointCallback(shape) {
      mouseDownReceived = true;

      if (shape !== that.mainView) {
        if (shape.isDraggable) {
          target = shape;
          if (event.shiftKey) {
            // we'll extend selection to the newly selected item below, in maybeClearSelection()
          }
          else {
            that.dragdrop.beginDrag(target, startPoint);
          }
        }
        else {
          shouldDrawLine = true;
        }
      }
  }

  function maybeClearSelection(event) {
    if (event.shiftKey || event.metaKey) return;
    if (existy(target) && target !== that.mainView) {
      if (not(targetIsSelectedChildView(target)))
        clearSelectedChildViewsSelection();
    }
    else {
      clearSelectedChildViewsSelection();
    }
  }

  function publishDogboneMouseDownEvent() {
    var payload = {
      "mousePoint":startPoint, 
      "target":target, 
      "dragging":that.dragdrop.isDragging};
    PubSub.global.publish(kDogboneMouseDown, payload);
  }

  function publishTargetSelectionChangedEvent() {
    if (existy(target)) {
        target.pubsub.publish(kDogboneSelectionChanged, true);
    }
  }

  function onMouseMove(event) {
    var mousePoint = Point.createFromMouseEventWithPageCoords(event);
    if (mouseDownReceived) { 
      if (existy(target)) {
        if (that.dragdrop.isDragging) {
          var dragOffset = that.dragdrop.moveDrag(event);
          moveSelectedChildViews(dragOffset);
        }
      }
      else {
        calculateSelectionFrame(event);
        if (not(shouldDrawLine)) {
          notifyChildViewsOfSelection(); 
        }
      }
    }

    var payload = {
      "mousePoint":mousePoint, 
      "target":target, 
      "dragging":that.dragdrop.isDragging,
      "selectionFrame":selectionFrame};
    PubSub.global.publish(kDogboneMouseMove, payload);
  }

  function onMouseUp(event) {
    var mousePoint = Point.createFromMouseEventWithPageCoords(event);

    if (shouldDrawLine) {
      that.mainView.displayListMap(function(childView) { 
        childView.onMouseUp(event);
      });
    }

    mouseDownReceived = false;
    selectionFrame = Rectangle.Empty;
    target = null;
    that.dragdrop.endDrag(event);
      
    var payload = {
      "mousePoint":mousePoint, 
      "target":target, 
      "selectionFrame":selectionFrame};
    PubSub.global.publish(kDogboneMouseUp, payload);
  }

  function onKeyUp(event) {
    switch (event.keyCode) {
      case kDeleteKey: removeSelectedChildViews(); break;
      default: break;
    }
  }

  function calculateSelectionFrame(event) {
      var deltaX = event.pageX - startPoint.x;
      var deltaY = event.pageY - startPoint.y;
      var size = Size.create(deltaX, deltaY);

      selectionFrame = Rectangle.createWithOriginAndSize(startPoint, size);
  } 
  
  function notifyChildViewsOfSelection() { 
    that.mainView.displayListMap(function(shape) { 
      var isSelected = selectionFrame.intersect(shape.frame); 
      shape.pubsub.publish(kDogboneSelectionChanged, selectionFrame.intersect(shape.frame)); 
    }); 
  }

  function selectedChildViewCount() {
    var numSelectedChildViews = 0;
    that.mainView.displayListMap(function(shape) { 
      if (shape.isSelected) numSelectedChildViews++;
    });
    return numSelectedChildViews;
  }

  function clearSelectedChildViewsSelection() { 
    that.mainView.displayListMap(function(shape) { 
      shape.pubsub.publish(kDogboneSelectionChanged, false); 
    }); 
  }

  function targetIsSelectedChildView() {
    var result = false;
    that.mainView.displayListMap(function(shape) { 
      if (shape.isSelected && shape === target) {
        result = true;
      }
    });
    return result;
  }

  function moveSelectedChildViews(dragOffset) {
    that.mainView.displayListMap(function(shape) { 
      if (shape.isSelected && shape !== target) {
        shape.moveBy(dragOffset);
      }
    });
  }

  function removeSelectedChildViews() {
    var shapesToRemove = [];

    that.mainView.displayListMap(function(shape) {
      if (shape.isSelected) {
        shapesToRemove.push(shape);
      }
    });

    shapesToRemove.forEach(function(shape) {
      that.removeChild(shape);
    })
  }

  function configureMainView() {
    that.mainView.backgroundColor = colorWithAlpha('#4682B4', 1.0);
    that.mainView.highlightBgColor = that.mainView.backgroundColor;
    that.mainView.name = kDogboneMainViewName;
    that.mainView.zOrder = -1000;

    that.dragdrop.registerDropTarget(that.mainView);
    that.mainView.willAcceptDrop = acceptsDrop;
  }

  var origFillStyle
    , _mainView = View.create(Rectangle.createWithCanvas(canvas))
    , mouseListenersConfigured = false
    , startPoint = Point.Empty
    , mouseDownReceived = false
    , target = null
    , selectionFrame = Rectangle.Empty
    , canvasFrame = Rectangle.createWithSize(Size.createWithCanvas(canvas)
    , shouldDrawLine = false);

  var _graphics = Graphics.create(canvas.getContext('2d'))
    , _gameLoop = GameLoop.create(updateAndRender)
    , _dragdrop = DragDrop.create();

  // Configuration
  configureMouseListeners();
  configureMainView();
  return that;
}

Dogbone.viewIsChild = function(view) {
  return (existy(view.parent) && view.parent.name === kDogboneMainViewName);
}
Dogbone.viewItNotChild = function(view) {return not(Dogbone.viewIsChild(view))};

if (typeof module !== 'undefined') {
  module.exports = Dogbone;
  var _ = require('underscore')
    , PubSub = require('../verdoux/pubsub.js')
    , Graphics = require('../dogbone/graphics.js')
    , DragDrop = require('../dogbone/dragdrop.js')
    , Point = require('../dogbone/geometry/point.js')
    , Rectangle = require('../dogbone/geometry/rectangle.js')
    , Size = require('../dogbone/geometry/size.js')
    , View = require('../dogbone/views/view.js')
    , GameLoop = require('../dogbone/gameLoop.js');
}
