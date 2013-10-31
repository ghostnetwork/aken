console.log("cento.js didLoad");

var globals = {};


function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);

  var fillStyle = colorWithAlpha('#4682B4', 0.80);
  console.log('fillStyle: ' + fillStyle);
  
  var rect = {x:0, y:0, width:50, height:50};
  that.dogbone.drawFilledRect(rect, fillStyle);

  return that;
}

function initialize() {
  console.log('initialize');

  var canvasElem = document.getElementById('canvas');
  console.log('canvasElem: ' + canvasElem);

  globals.cento = new Cento(canvas)
  console.log('globals: ' + inspect(globals));
}
