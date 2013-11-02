function GameLoop(callback) {
  var that = PubSub.create();

  that.start = function() {
    console.log('GameLoop.start');
    pulse.addObserver(_callback);
    pulse.start(20);
  }

  that.stop = function() {
    console.log('GameLoop.stop');
    pulse.removeObserver(_callback);
    pulse.stop();
  }

  var pulse = Pulse.create();
  var _callback = callback;

  return that;
}

GameLoop.create = function(callback) {
  return new GameLoop(callback);
};
