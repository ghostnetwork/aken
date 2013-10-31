function Pulse() {
  var that = {
    get interval(){return _interval;}
  };

  that.create = function(){return new Pulse();};
  
  that.start = function(interval) {
    _interval = interval;
    timerId = setInterval(function() {
        //that.emit('pulse');
        console.log('pulse emitted');
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