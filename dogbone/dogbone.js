function Dogbone(canvas) {

  var that = {
    get graphics(){return _graphics;},
    get gameLoop(){return _gameLoop;}
  };

  function gameLoopHandler() {
    update();
    render();
  }

  function update() {
  }

  function render() {
    var numChildren = displayList.length;
    for (var i = 0; i < numChildren; i++) {
      var shape = displayList[i];
      shape.render(_graphics);
    };
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

  var origFillStyle;
  var displayList = [];

  var _graphics = Graphics.create(canvas.getContext('2d'))
    , _gameLoop = GameLoop.create(gameLoopHandler);

  return that;
}
