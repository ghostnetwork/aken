function Dogbone(canvas) {

  var that = {
    get canvas(){return _canvas;}
  };

  that.drawFilledRect = function(rect, fillStyle) {
    pushFillStyle(fillStyle);
    _context.fillRect(rect.x, rect.y, rect.width, rect.height);
    popFillStyle();
  };

  that.clearRect = function(rect) {
    _context.clearRect(rect.x, rect.y, rect.width, rect.height);
  };

  that.strokeRect = function(rect) {
    _context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  };

  that.drawText = function(what, where, style) {
    if (existy(style)) {
      if (existy(style.color)) {_context.fillStyle = style.color;};
      if (existy(style.font)) {_context.font = style.font;};
    }
    _context.fillText(what, where.x, where.y);
  }

  function pushFillStyle(fillStyle) {
    origFillStyle = _context.fillStyle;
    _context.fillStyle = fillStyle;
  }

  function popFillStyle(fillStyle) {
    _context.fillStyle = origFillStyle;
  }

  var _canvas = canvas;
  var _context = canvas.getContext('2d');
  var origFillStyle;

  return that;
}

function colorWithAlpha(color, alpha) {
  // Assumes color has format of '#RRGGBB'
  var red = parseInt(color.substring(1, 3), 16);
  var green = parseInt(color.substring(3, 5), 16);
  var blue = parseInt(color.substring(5, 7), 16);
  return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha +')';
}