function Pulse() {
  var that = PubSub.create();

  that.start = function(interval) {
    _interval = interval;
    timerId = setInterval(function() {
      that.publish('pulse');
    }, interval);
  }

  that.stop = function() {
    clearInterval(timerId);
  };

  var _interval
    , timerId;

  return that;
}
Pulse.create = function(){return new Pulse();};