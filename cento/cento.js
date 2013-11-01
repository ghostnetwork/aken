var globals = {};

function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);

  /*
  var fillStyle = colorWithAlpha('#4682B4', 0.80);
  var rect = {x:0, y:0, width:50, height:50};
  that.dogbone.drawFilledRect(rect, fillStyle);

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
  return that;
}

function initialize() {
  var canvasElem = document.getElementById('canvas');
  globals.cento = new Cento(canvasElem)
}
