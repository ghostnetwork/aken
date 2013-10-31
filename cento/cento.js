var globals = {};

function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);

  var fillStyle = colorWithAlpha('#4682B4', 0.80);
  var rect = {x:0, y:0, width:50, height:50};
  that.dogbone.drawFilledRect(rect, fillStyle);

  // var pulse = Pulse.create();
  // pulse.start(1000);
  
  return that;
}

function initialize() {
  var canvasElem = document.getElementById('canvas');
  globals.cento = new Cento(canvasElem)
}
