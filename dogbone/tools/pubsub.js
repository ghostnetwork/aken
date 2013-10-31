function PubSub() {
  var that = {};

  that.addSubscriber = function(topic, subscriber) {
    _subscribers[topic] = subscriber;
  }

  var _subscribers = [];
  return that;
}

PubSub.create = function(){return new PubSub();};
