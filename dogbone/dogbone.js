function Dogbone(canvas) {
  var that = {
    get graphics(){return _graphics;},
    get gameLoop(){return _gameLoop;}
  };

  function updateAndRender() {
    update();
    render();
  }

  function update() {
    sortDisplayListByZOrder();
  }

  var selectionFrameColor = colorWithAlpha('#777777', 1.0);
  function render() {
    clearDisplay();
    displayList.forEach(function(shape) {
      shape.render(_graphics);
    });
    if (_selectionFrame.size.width > 0 && _selectionFrame.size.height > 0) {
      _graphics.drawRect(_selectionFrame, selectionFrameColor);
    }
  }

  that.start = function() {_gameLoop.start();};
  that.stop = function() {_gameLoop.stop();};

  that.addChild = function(child) { 
    var numChildren = displayList.push(child);
    inspect(displayList);
    return that;
  };

  that.removeChild = function(child) {
    var index = displayList.indexOf(child);
    if (index >= 0) {
      var shape = displayList[index];
      _graphics.clearRect(shape.frame);
      displayList.splice(index, 1);
    }
    inspect(displayList);
    return that;
  }

  function sortDisplayListByZOrder() {
    displayList.sort(function(a, b) {
      var result = 0;
      if (a.zOrder < b.zOrder)
        result = -1;
      else if (a.zOrder > b.zOrder)
        result = 1;
      return result;
    });
  }

  function logDisplayList() {
    for (var i = 0; i < displayList.length; i++) {
      var shape = displayList[i];
      console.log(shape.frame.debugString() + '(' + shape.zOrder + ')');
    };
  }

  function clearDisplay() {
    _graphics.clearRect(canvasFrame);
  }

  var mouseListenersConfigured = false;
  function configureMouseListeners() {
    if (mouseListenersConfigured) {return;}
    mouseListenersConfigured = true;

    canvas.addEventListener('mousedown', function(event) {
      onMouseDown(event);
    });

    canvas.addEventListener('mousemove', function(event) {
      onMouseMove(event);
    });

    canvas.addEventListener('mouseup', function(event) {
      onMouseUp(event);
    });
  }


  var startPoint = Point.Empty;
  var mouseDownReceived = false;
  var target = null;
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
    console.log('_selectionFrame: ' + _selectionFrame.debugString());
    mouseDownReceived = false;
    _selectionFrame = Rectangle.Empty;
    console.log('target: ' + inspect(target));
  }

  function hitTest(point, handler) {
    displayList.forEach(function(shape) {
      if (shape.hitTest(point))
        handler(shape);
    });
  }

  var origFillStyle;
  var displayList = [];

  var _graphics = Graphics.create(canvas.getContext('2d'))
    , _gameLoop = GameLoop.create(updateAndRender)
    , _selectionFrame = Rectangle.Empty
    , canvasFrame = Rectangle.createWithSize(Size.createWithCanvas(canvas));

  configureMouseListeners();
  return that;
}
