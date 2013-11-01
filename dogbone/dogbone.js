function Dogbone(canvas) {

  var that = {
    get graphics(){return _graphics;},
    get gameLoop(){return _gameLoop;}
  };

  function gameLoopHandler() {
    console.log('gameLoopHandler update');
    console.log('gameLoopHandler render');
  }

  that.start = function() {_gameLoop.start();};
  that.stop = function() {_gameLoop.stop();};

  var origFillStyle;
  var displayList = [];

  var _graphics = Graphics.create(canvas.getContext('2d'))
    , _gameLoop = GameLoop.create(gameLoopHandler);

  return that;
}
