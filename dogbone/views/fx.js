
function FX(worker) {
  var that = PubSub.create();

  var pulse = Pulse.create();
  pulse.onPulse(function() {
    worker();
  });

  that.start = function(pulseInterval, durationMS) {
    pulse.start(pulseInterval);

    setTimeout(function() {
      pulse.stop();
    }, durationMS);
  }
  return that;
}

FX.start = function(pulseInterval, durationMS, worker) {
  new FX(worker).start(pulseInterval, durationMS);
}
