var globals = {};

function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);

  return that;
}

function initialize() {
  console.log('initialize()');
  var canvasElem = document.getElementById('canvas');
  globals.cento = new Cento(canvasElem)

  testGraphics(globals.cento);
  testDogboneAddRemoveChildren(globals.cento);
  testGameLoop(globals.cento);
}

function testGraphics(that) {
  var rect = {x:10, y:10, width:50, height:50};
  var fillStyle = colorWithAlpha('#4682B4', 0.50);
  that.dogbone.graphics.drawFilledRect(rect, fillStyle);

  rect = {x:35, y:35, width:50, height:50};
  fillStyle = colorWithAlpha('#82B446', 0.50);
  that.dogbone.graphics.drawFilledRect(rect, fillStyle);
}

function testGameLoop(that) {
  that.dogbone.start();

  setTimeout(function() {
    that.dogbone.stop();
  }, 10000);
}

function testDogboneAddRemoveChildren(that) {
  var frame = makeRectangle(100, 110, 120, 130);
  console.log('frame: ' + frame.debugString());

  var shape = Shape.create(frame);
  shape.backgroundColor = colorWithAlpha('#c70000', 0.5);
  that.dogbone.addChild(shape);

  frame = makeRectangle(150, 150, 100, 100);
  var box = Box.create(frame);
  box.backgroundColor = colorWithAlpha('#00c700', 0.5);
  that.dogbone.addChild(box);

  setTimeout(function() {
    that.dogbone.removeChild(box);
  }, 3000);
}

  /*
  var counter = 0;
  var maxTimes = 5;
  var limit = maxTimes * 2;
  var pulse = Pulse.create();

  var firstHandler = function(payload) {
    console.log('  firstHandler callback ' + counter);
    if (counter++ >= maxTimes) {
      console.log('firstHandler done');
      pulse.off('pulse', firstHandler);
    }
  };

  var secondHandler = function(payload) {
    console.log('    secondHandler callback ' + counter);
    if (counter++ >= limit) {
      console.log('secondHandler done');
      pulse.off('pulse', secondHandler);
      pulse.stop();
    }
  };

  pulse.on('pulse', firstHandler);
  pulse.on('pulse', secondHandler);

  pulse.start(500);
  */
