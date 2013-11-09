function FunctionalTests() {
  var that = {};

  that.runTests = function(cento){
    testDogboneAddRemoveChildren(cento);
    testGameLoop(cento);
  };

  function testGraphics(cento) {
    var rect = {x:10, y:10, width:50, height:50};
    var fillStyle = colorWithAlpha('#4682B4', 0.50);
    cento.dogbone.graphics.drawFilledRect(rect, fillStyle);

    rect = {x:35, y:35, width:50, height:50};
    fillStyle = colorWithAlpha('#82B446', 0.50);
    cento.dogbone.graphics.drawFilledRect(rect, fillStyle);
  }

  function testGameLoop(cento) {
    cento.dogbone.start();

    var numSeconds = 10;
    console.log('will stop GameLoop in ' + numSeconds + ' seconds');
    setTimeout(function() {
      cento.dogbone.stop();
    }, numSeconds * 1000);
  }

  function testDogboneAddRemoveChildren(cento) {
    var frame = makeRectangle(100, 110, 120, 130);
    var shape = View.create(frame);
    shape.backgroundColor = colorWithAlpha('#c70033', 0.5);
    shape.zOrder = 1000;
    cento.dogbone.addChild(shape);

    frame = makeRectangle(150, 175, 100, 100);
    var box = Box.create(frame);
    box.backgroundColor = colorWithAlpha('#0033c7', 1.0);
    box.zOrder = 999;
    cento.dogbone.addChild(box);

    var numSeconds = 3;
    console.log('will remove green box in ' + numSeconds + ' seconds');
    setTimeout(function() {
      cento.dogbone.removeChild(box);
      console.log('green box removed');
    }, numSeconds * 1000);
  }

  return that;
}

FunctionalTests.create = function(){return new FunctionalTests();};
FunctionalTests.perform = function(cento){FunctionalTests.create().runTests(cento);};
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
