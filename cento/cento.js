var globals = {};

function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);
  
  that.start = function(){that.dogbone.start();};
  that.stop = function(){that.dogbone.stop();};

  return that;
}

function initialize() {
  var canvasElem = document.getElementById('canvas');
  globals.cento = new Cento(canvasElem);

  var canvasSize = Size.createWithCanvas(canvas);
  configureViews(globals.cento, canvasSize);

  globals.cento.start();

  // FunctionalTests.perform(globals.cento);
}

var kProgramViewAlpha  = 0.5;
var kToolViewAlpha  = 0.7;
function configureViews(cento, canvasSize) {
  console.log('canvasSize: ' + canvasSize.debugString());

  configureToolsView(canvasSize, cento.dogbone);
  configureLibraryView(canvasSize, cento.dogbone);
  configureFooView(canvasSize, cento.dogbone);
  configureProgramView(canvasSize, cento.dogbone);

  console.log('mainView.childCount: ' + cento.dogbone.childCount);
}

function configureProgramView(canvasSize, mainView) {
  var pad = 30;
  var x = (canvasSize.width * 0.05) + pad;
  var frame = Rectangle.create(x, pad, 200, 100);
  var programView = ProgramView.create(frame);
  programView.name = "Cento.ProgramView";
  programView.backgroundColor = colorWithAlpha('#333333', kProgramViewAlpha);
  mainView.addChild(programView);
}

function configureToolsView(canvasSize, mainView) {
  var frame = Rectangle.create(0, 0, canvasSize.width * 0.05, canvasSize.height);
  var toolsView = View.create(frame);
  toolsView.backgroundColor = colorWithAlpha('#c70000', kToolViewAlpha);
  toolsView.name = "ToolsView";
  toolsView.zOrder = 100;
  toolsView.onTouch = function() {
    console.log(toolsView.name + ' was touched');
    touchHandler(toolsView, canvasSize, 0, 0);
  }
  mainView.addChild(toolsView);
}

function configureLibraryView(canvasSize, mainView) {
  var frame = Rectangle.create(0, 50, canvasSize.width * 0.05, canvasSize.height);
  var toolsView = View.create(frame);
  toolsView.backgroundColor = colorWithAlpha('#00c700', kToolViewAlpha);
  toolsView.name = "LibraryView";
  toolsView.zOrder = 101;
  toolsView.onTouch = function() {
    console.log(toolsView.name + ' was touched');
    touchHandler(toolsView, canvasSize, 0, 50);
  }
  mainView.addChild(toolsView);
}

function configureFooView(canvasSize, mainView) {
  var frame = Rectangle.create(0, 100, canvasSize.width * 0.05, canvasSize.height);
  var toolsView = View.create(frame);
  toolsView.backgroundColor = colorWithAlpha('#0000c7', kToolViewAlpha);
  toolsView.name = "FooView";
  toolsView.isOpened = false;
  toolsView.zOrder = 102;
  toolsView.onTouch = function() {
    console.log(toolsView.name + ' was touched');
    touchHandler(toolsView, canvasSize, 0, 100);
  }
  mainView.addChild(toolsView);
}

function touchHandler(view, canvasSize, startX, startY) {
  console.log(view.name + ' was touched');
  if (view.isOpened) {
    closeView(view, canvasSize, startX, startY);
  } 
  else {
    openView(view, canvasSize, startX, startY);
  }
}

function openView(view, canvasSize, startX, startY) {
  var maxX = (canvasSize.width * 0.90) - startY;
  var newFrame = Rectangle.create(startX, startY, maxX, canvasSize.height);
  view.resizeFrame(newFrame);
  view.isOpened = true;
}

function closeView(view, canvasSize, startX, startY) {
  var newFrame = Rectangle.create(startX, startY, canvasSize.width * 0.05, canvasSize.height);
  view.resizeFrame(newFrame);
  view.isOpened = false;
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

