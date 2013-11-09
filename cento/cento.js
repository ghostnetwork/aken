globals = {};

function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);
  
  that.start = that.dogbone.start;
  that.stop = that.dogbone.stop;

  return that;
}

function initialize() {
  var canvasElem = document.getElementById('canvas');
  globals.cento = new Cento(canvasElem);

  var canvasSize = Size.createWithCanvas(canvas);
  var example002 = Example002.create(globals.cento.dogbone, canvasSize);

  globals.cento.start();
}

if (typeof module !== 'undefined') {
  module.exports = Cento;

  var util = require('util')
    , Dogbone = require('../dogbone/dogbone.js')
    , PubSub = require('../verdoux/pubsub.js')
    , Example002 = require('../cento/examples/example002.js');

  // Remove this; use sinon mock (stub or spy)  
  var MockCanvas = function() {
    var that = {};
    that.getContext = function(type){return 'MockCanvas.getContext';};
    that.addEventListener = function(topic, subscriber) {pubsub.subscribe(topic, subscriber);};
    var pubsub = PubSub.create();
    return that;
  };
  MockCanvas.create = function(){return new MockCanvas();};

  Cento.app = new Cento(MockCanvas.create());
}

  // configureProgramView(canvasSize, cento.dogbone);

// function configureProgramView(canvasSize, mainView) {
//   var pad = 30;
//   var x = (canvasSize.width * 0.05) + pad;
//   var frame = Rectangle.create(x, pad, 200, 100);
//   var programView = ProgramView.create(frame);
//   programView.name = "Cento.ProgramView";
//   programView.backgroundColor = colorWithAlpha('#333333', kProgramViewAlpha);
//   programView.makeUndraggable();
//   mainView.addChild(programView);
// }
