var kPulseEvent = 'pulse';

function Pulse() {
  var that = PubSub.create();

  that.start = function(interval) {
    _interval = interval;
    timerId = setInterval(function() {
      that.publish(kPulseEvent);
    }, interval);
  }

  that.stop = function() {
    clearInterval(timerId);
  };

  that.addObserver = function(subscriber) {
    that.subscribe(kPulseEvent, subscriber);
  };

  that.removeObserver = function(subscriber) {
    that.unsubscribe(kPulseEvent, subscriber);
  }

  var _interval
    , timerId;

  return that;
}

Pulse.create = function(){return new Pulse();};
