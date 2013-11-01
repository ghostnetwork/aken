function Dogbone(canvas) {

  var that = {
    get graphics(){return _graphics;}
  };

  var _graphics = Graphics.create(canvas.getContext('2d'));
  var origFillStyle;
  var displayList = [];

  return that;
}
