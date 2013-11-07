var kDogboneMainViewName  = 'Dogbone';
var kDogboneMouseDown     = 'dogbone.mousedown';
var kDogboneMouseMove     = 'dogbone.mousemove';
var kDogboneMouseUp       = 'dogbone.mouseup';

function Dogbone(canvas) {
  var that = PubSub.create();

  Object.defineProperty(that, 'graphics', 
    {get : function() {return _graphics;},enumerable : true});
  Object.defineProperty(that, 'gameLoop', 
    {get : function() {return _gameLoop;},enumerable : true});
  Object.defineProperty(that, 'childCount', 
    {get : function() {return mainView.childCount;},enumerable : true});
  Object.defineProperty(that, 'dragdrop', 
    {get : function() {return _dragdrop;},enumerable : true});

  // Public API
  that.start = function() {_gameLoop.start();};
  that.stop = function() {_gameLoop.stop();};

  that.addChild = function(child) { 
    mainView.addChild(child);
    return that;
  };

  that.removeChild = function(child) {
    mainView.removeChild(child);
    return that;
  }

  // Update / Render
  function updateAndRender() {
    update();
    render();
  }

  function update() {mainView.update();}

  function render() {
    clearDisplay();
    mainView.render(_graphics);
    if (selectionFrame.size.width > 0 && selectionFrame.size.height > 0) {
      _graphics.drawRect(selectionFrame, selectionFrameColor);
    }
  }

  function clearDisplay() {_graphics.clearRect(canvasFrame);}

  function renderBackground() {
    if (canDisplay) {
      _graphics.drawImage(vader, 0, 0, 100, 100);
    }
  }

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

    frameContainsPoint(startPoint, function(shape) {
      mouseDownReceived = true;
      if (shape !== mainView) {
        target = shape;
        that.dragdrop.beginDrag(target, startPoint);
      }
    });

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
          that.dragdrop.moveDrag(event);
        }
      }
      else {
        calculateSelectionFrame(event);
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

  function frameContainsPoint(point, handler) {mainView.frameContainsPoint(point, handler);}

  function configureMainView() {
    mainView.backgroundColor = colorWithAlpha('#4682B4', 1.0);
    mainView.highlightBgColor = mainView.backgroundColor;
    mainView.name = kDogboneMainViewName;
    mainView.zOrder = -1000;

    that.dragdrop.registerDropTarget(mainView);
    mainView.willAcceptDrop = acceptsDrop;
  }

  var origFillStyle
    , mainView = View.create(Rectangle.createWithCanvas(canvas))
    , selectionFrameColor = colorWithAlpha('#333333', 1.0)
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






  //-----------------------------------------------------------------------------
var ctx = canvas.getContext('2d');


// ctx.fillRect(50,50,200,200); // something in the background

var img = new Image();
img.onload = function() {
    // ctx.drawImage(img, 10, 50);
}
  img.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png"; //transparent png


  //-----------------------------------------------------------------------------
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
