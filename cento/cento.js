var globals = {};

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
  configureDraggableViews(canvasSize, cento.dogbone);
  configureDropTargets(canvasSize, cento.dogbone);
  configureFadeableView(canvasSize, cento.dogbone);

  console.log('mainView.childCount: ' + cento.dogbone.childCount);
}

function configureToolsView(canvasSize, mainView) {
  var frame = Rectangle.create(0, 0, canvasSize.width * 0.05, canvasSize.height);
  var toolsView = View.create(frame);
  toolsView.backgroundColor = colorWithAlpha('#c70000', kToolViewAlpha);
  toolsView.name = "ToolsView";
  toolsView.zOrder = ZORDER_TOP - 1000000;
  toolsView.makeUndraggable();
  var isOpen = false;
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
  toolsView.zOrder = ZORDER_TOP - 2000000;
  toolsView.makeUndraggable();
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
  toolsView.zOrder = ZORDER_TOP - 3000000;
  toolsView.makeUndraggable();
  toolsView.onTouch = function() {
    console.log(toolsView.name + ' was touched');
    touchHandler(toolsView, canvasSize, 0, 100);
  }
  mainView.addChild(toolsView);
}

function configureProgramView(canvasSize, mainView) {
  var pad = 30;
  var x = (canvasSize.width * 0.05) + pad;
  var frame = Rectangle.create(x, pad, 200, 100);
  var programView = ProgramView.create(frame);
  programView.name = "Cento.ProgramView";
  programView.backgroundColor = colorWithAlpha('#333333', kProgramViewAlpha);
  programView.makeUndraggable();
  mainView.addChild(programView);
}

function configureDraggableViews(canvasSize, mainView) {
  var pad = 30;
  var x = (canvasSize.width * 0.05) + pad;
  var y = 150;
  var frame;
  var draggableView;
  var colors = ['#ffffff','#aaaaaa','#555555'];
  var orders = [1001, 1000, 1002];

  for (var i = 0; i < 3; i++) {
    frame = Rectangle.create(x, y, 50, 50);
    draggableView = View.create(frame);
    draggableView.name = "Cento.draggableView." + i;
    draggableView.backgroundColor = colorWithAlpha(colors[i], 1.0);
    draggableView.zOrder = orders[i];

    mainView.addChild(draggableView);
    x += 20;
    y += 20;
  }
}

function configureDropTargets(canvasSize, mainView) {
  var x = 200;
  var y = 200;
  var frame = Rectangle.create(x, y, 100, 100);
  var dropTargetView = View.create(frame);
  dropTargetView.name = "Cento.DropTargetView.01";
  dropTargetView.backgroundColor = colorWithAlpha('#77c777', 1.0);
  dropTargetView.highlightBgColor = colorWithAlpha('#c7c700', 1.0);
  dropTargetView.zOrder = 100;
  dropTargetView.willAcceptDrop = acceptsDrop;

  mainView.dragdrop.registerDropTarget(dropTargetView);
  mainView.addChild(dropTargetView);

  x = 325;
  y = 200;
  frame = Rectangle.create(x, y, 100, 100);
  var dropTargetViewB = View.create(frame);
  dropTargetViewB.name = "Cento.DropTargetView.02";
  dropTargetViewB.zOrder = 200;
  dropTargetViewB.backgroundColor = colorWithAlpha('#5555c7', 1.0);
  dropTargetViewB.highlightBgColor = colorWithAlpha('#c7c700', 1.0);
  dropTargetViewB.willAcceptDrop = acceptsDrop;

  mainView.dragdrop.registerDropTarget(dropTargetViewB);
  mainView.addChild(dropTargetViewB);
}

function configureFadeableView(canvasSize, mainView) {
  var x = 400;
  var y = 400;
  var frame = Rectangle.create(x, y, 200, 200);
  var view = View.create(frame);
  view.backgroundColor = colorWithAlpha('#ff0000', 0.7);
  view.name = 'Cento.fadeable.view';

  var isOpen = true;
  var origBgColor = view.backgroundColor;
  view.onTouch = function() {
    var fadeDuration = 500;
    if (!isOpen) {
      View.fadeIn(view, origBgColor, fadeDuration);
      isOpen = true;
    }
    else {
      var origFrame = view.frame.clone();
      var startPoint = view.frame.origin.clone();
      var destPoint = startPoint.clone();
      var maxX = view.frame.origin.x + (canvasSize.width - view.frame.size.width);
      destPoint.moveTo(maxX, view.frame.origin.y);
      View.animatedMoveTo(view, startPoint, destPoint, 1000);
      View.fadeOut(view, fadeDuration);
      isOpen = false;

      setTimeout(function() {
        var destPt = origFrame.origin.clone();
        View.animatedMoveTo(view, destPoint, startPoint, 1000);
        View.fadeIn(view, origBgColor, fadeDuration);
        isOpen = true;
      }, 1000);
    }
    
  }

  mainView.addChild(view);
}

function touchHandler(view, canvasSize, startX, startY) {
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

