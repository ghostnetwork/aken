var globals = {};

function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);

  return that;
}

function initialize() {
  var canvasElem = document.getElementById('canvas');
  globals.cento = new Cento(canvasElem);

  FunctionalTests.perform(globals.cento);
}

if (typeof module !== 'undefined') {
  module.exports = Cento;

  var util = require('util')
    , Dogbone = require('../dogbone/dogbone.js')
    , PubSub = require('../verdoux/pubsub.js');
  
  var MockCanvas = function() {
    var that = {};
    that.getContext = function(type){return 'MockCanvas.getContext';};
    that.addEventListener = function(topic, subscriber) {
      pubsub.subscribe(topic, subscriber);
    };
    var pubsub = PubSub.create();
    return that;
  };
  MockCanvas.create = function(){return new MockCanvas();};

  Cento.app = new Cento(MockCanvas.create());
}

