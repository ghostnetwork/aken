function GameLoop(callback) {
  var that = PubSub.create();

  that.start = function() {
    console.log('GameLoop.start');
    pulse.on('pulse', callback);
    pulse.start(20);
  }

  that.stop = function() {
    console.log('GameLoop.stop');
    pulse.stop();
  }

  var pulse = Pulse.create();
  var _callback = callback;

  return that;
}

GameLoop.create = function(callback) {
  return new GameLoop(callback);
};
