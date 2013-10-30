console.log("cento.js didLoad");

var globals = {};


function Cento(canvas) {
  var that = {};

  that.dogbone = new Dogbone(canvas);
  
  return that;
}

function initialize() {
  console.log('initialize');

  var canvasElem = document.getElementById('canvas');
  console.log('canvasElem: ' + canvasElem);

  globals.cento = new Cento(canvas)
  console.log('globals: ' + inspect(globals));
}
