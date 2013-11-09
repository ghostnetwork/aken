kDogboneMainViewName      = 'Dogbone'; 
kDogboneMouseDown         = 'dogbone.mousedown'; 
kDogboneMouseMove         = 'dogbone.mousemove'; 
kDogboneMouseUp           = 'dogbone.mouseup'; 
kDogboneSelectionChanged  = 'dogbone.selection.changed';

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
  
  // Public API
  that.start = function() {_gameLoop.start();};
  that.stop = function() {_gameLoop.stop();};

  that.addChild = function(child) { 
    that.mainView.addChild(child);
    return that;
  };

  that.removeChild = function(child) {
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
    if (selectionFrame.size.width > 0 && selectionFrame.size.height > 0) {
      _graphics.drawRect(selectionFrame, that.selectionFrameColor);
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
  }

  function onMouseDown(event) {
    startPoint = Point.createFromMouseEventWithPageCoords(event);

    that.mainView.frameContainsPoint(startPoint, function(shape) {
      mouseDownReceived = true;
      if (shape !== that.mainView) {
        target = shape;
        that.dragdrop.beginDrag(target, startPoint);
      }
    });

    if (target !== that.mainView) {
      if (not(targetIsSelectedChildView(target)))
        clearSelectedChildViewsSelection();
    }
    else {
      clearSelectedChildViewsSelection();
    }

    var payload = {
      "mousePoint":startPoint, 
      "target":target, 
      "dragging":that.dragdrop.isDragging};
    that.publish(kDogboneMouseDown, JSON.stringify(payload));
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
        notifyChildViewsOfSelection(); 
      }
    }

    var payload = {
      "mousePoint":mousePoint, 
      "target":target, 
      "dragging":that.dragdrop.isDragging,
      "selectionFrame":selectionFrame};
    that.publish(kDogboneMouseMove, JSON.stringify(payload));
  }

  function onMouseUp(event) {
    var mousePoint = Point.createFromMouseEventWithPageCoords(event);
    mouseDownReceived = false;
    selectionFrame = Rectangle.Empty;
    target = null;
    that.dragdrop.endDrag(event);
      
    var payload = {
      "mousePoint":mousePoint, 
      "target":target, 
      "selectionFrame":selectionFrame};
    that.publish(kDogboneMouseUp, JSON.stringify(payload));
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
    , canvasFrame = Rectangle.createWithSize(Size.createWithCanvas(canvas));

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
  var PubSub = require('../verdoux/pubsub.js')
    , Graphics = require('../dogbone/graphics.js')
    , DragDrop = require('../dogbone/dragdrop.js')
    , Point = require('../dogbone/geometry/point.js')
    , Rectangle = require('../dogbone/geometry/rectangle.js')
    , Size = require('../dogbone/geometry/size.js')
    , View = require('../dogbone/views/view.js')
    , GameLoop = require('../dogbone/gameLoop.js');
}
