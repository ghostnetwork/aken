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
    sortDisplayListByZOrder();
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

  var origFillStyle;
  var displayList = [];

  var _graphics = Graphics.create(canvas.getContext('2d'))
    , _gameLoop = GameLoop.create(gameLoopHandler);

  return that;
}
