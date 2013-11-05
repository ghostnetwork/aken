function Dogbone(canvas) {
  var that = {
    get graphics(){return _graphics;},
    get gameLoop(){return _gameLoop;},
    get childCount(){return mainView.childCount;}
  };

  // Publis API
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
    if (_selectionFrame.size.width > 0 && _selectionFrame.size.height > 0) {
      _graphics.drawRect(_selectionFrame, selectionFrameColor);
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
    mouseDownReceived = true;
    startPoint = Point.createFromMouseEventWithPageCoords(event);
    console.log('startPoint: ' + startPoint.debugString());

    frameContainsPoint(startPoint, function(shape) {
      if (shape !== mainView) {
        target = shape;
        console.log('target: ' + target.name);
        dragdrop.beginDrag(target, startPoint);
      }
    });
  }

  function onMouseMove(event) {
    if (mouseDownReceived && notExisty(target)) {
      var deltaX = event.pageX - startPoint.x;
      var deltaY = event.pageY - startPoint.y;
      var size = Size.create(deltaX, deltaY);

      _selectionFrame = Rectangle.createWithOriginAndSize(startPoint, size);
    }
  }

  function onMouseUp(event) {
    console.log('onMouseUp:_selectionFrame: ' + _selectionFrame.debugString());
    mouseDownReceived = false;
    _selectionFrame = Rectangle.Empty;
    target = null;
  }

  function frameContainsPoint(point, handler) {
    mainView.frameContainsPoint(point, handler);
  }

  function configureMainView() {
    mainView.backgroundColor = colorWithAlpha('#4682B4', 1.0);
  }

  var origFillStyle
    , mainView = View.create(Rectangle.createWithCanvas(canvas))
    , selectionFrameColor = colorWithAlpha('#333333', 1.0)
    , mouseListenersConfigured = false
    , startPoint = Point.Empty
    , mouseDownReceived = false
    , target = null
    , canvasFrame = Rectangle.createWithSize(Size.createWithCanvas(canvas))
    , dragdrop = DragDrop.create();

  var _graphics = Graphics.create(canvas.getContext('2d'))
    , _gameLoop = GameLoop.create(updateAndRender)
    , _selectionFrame = Rectangle.Empty;

  // Configuration
  configureMouseListeners();
  configureMainView();
  return that;
}

if (typeof module !== 'undefined') {
  module.exports = Dogbone;
  var Graphics = require('../dogbone/graphics.js')
    , colorWithAlpha = Graphics.colorWithAlpha
    , DragDrop = require('../dogbone/dragdrop.js')
    , Point = require('../dogbone/geometry/point.js')
    , Rectangle = require('../dogbone/geometry/rectangle.js')
    , Size = require('../dogbone/geometry/size.js')
    , View = require('../dogbone/views/view.js')
    , GameLoop = require('../dogbone/gameLoop.js');
}
