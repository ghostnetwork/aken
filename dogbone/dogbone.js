function Dogbone(canvas) {
  var that = {
    get graphics(){return _graphics;},
    get gameLoop(){return _gameLoop;}
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
    startPoint = Point.createFromMouseEvent(event);
    console.log('startPoint: ' + startPoint.debugString());

    hitTest(startPoint, function(shape) {
      target = shape;
    });
  }

  function onMouseMove(event) {
    if (mouseDownReceived) {
      var deltaX = event.pageX - startPoint.x;
      var deltaY = event.pageY - startPoint.y;
      var size = Size.create(deltaX, deltaY);
      _selectionFrame = Rectangle.createWithOriginAndSize(startPoint, size);
      console.log('onMouseMove:_selectionFrame: ' + _selectionFrame.debugString());
    }
  }

  function onMouseUp(event) {
    console.log('onMouseUp:_selectionFrame: ' + _selectionFrame.debugString());
    console.log('target: ' + inspect(target));
    mouseDownReceived = false;
    _selectionFrame = Rectangle.Empty;
  }

  function hitTest(point, handler) {
    mainView.hitTest(point, handler);
  }

  var origFillStyle
    , mainView = View.create(Rectangle.createWithCanvas(canvas))
    , selectionFrameColor = colorWithAlpha('#777777', 1.0)
    , mouseListenersConfigured = false
    , startPoint = Point.Empty
    , mouseDownReceived = false
    , target = null
    , canvasFrame = Rectangle.createWithSize(Size.createWithCanvas(canvas));

  var _graphics = Graphics.create(canvas.getContext('2d'))
    , _gameLoop = GameLoop.create(updateAndRender)
    , _selectionFrame = Rectangle.Empty;

  // Configuration
  configureMouseListeners();
  return that;
}
