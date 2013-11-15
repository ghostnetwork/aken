function GameLoop(callback) {
  var that = PubSub.create();

  that.start = function() {
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

if (typeof module !== 'undefined') {
  module.exports = GameLoop;
  var PubSub = require('../verdoux/pubsub.js')
    , Pulse = require('../verdoux/pulse.js');
}
