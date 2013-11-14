function Graphics(context) {
  var that = {
    get context(){return _context;}
  }

  that.clearRect = function(rect) {
    _context.clearRect(rect.x, rect.y, rect.width, rect.height);
  };

  that.drawFilledRect = function(rect, color) {
    pushFillStyle(color);
    _context.fillRect(rect.x, rect.y, rect.width, rect.height);
    popFillStyle();
  };

  that.drawRect = function(rect, color) {
    pushStrokeStyle(color);
    _context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    popStrokeStyle();
  }

  that.strokeRect = function(rect) {
    _context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  };

  that.drawText = function(what, where, style) {
    pushFillStyle(style.color);

    if (existy(style)) {
      if (existy(style.color)) {_context.fillStyle = style.color;};
      if (existy(style.font)) {_context.font = style.font;};
    }
    _context.fillText(what, where.x, where.y);

    popFillStyle();
  }

  that.measureText = function(text, style) {
    if (existy(style)) {
      if (existy(style.color)) {_context.fillStyle = style.color;};
      if (existy(style.font)) {_context.font = style.font;};
    }
    return _context.measureText(text);
  }

  that.drawImage = function(image, x, y, width, height) {
    _context.drawImage(image, x, y, width, height);
  }

  that.drawLine = function(startX, startY, endX, endY, color) {
    pushStrokeStyle(color);

    _context.beginPath();
    _context.moveTo(startX, startY);
    _context.lineTo(endX, endY);
    _context.closePath();
    _context.stroke();

    popStrokeStyle();
  }

  function pushFillStyle(fillStyle) {
    origFillStyle = _context.fillStyle;
    _context.fillStyle = fillStyle;
  }
  function popFillStyle() {_context.fillStyle = origFillStyle;}

  function pushStrokeStyle(strokeStyle) {
    origStrokeStyle = strokeStyle;
    _context.strokeStyle = strokeStyle;
  }
  function popStrokeStyle() {_context.strokeStyle = origStrokeStyle;}

  var origFillStyle
    , origStrokeStyle;

  var _context = context;
  return that;
}

Graphics.create = function(context) {return new Graphics(context);};

colorWithAlpha = function(color, alpha) {
  // Assumes color has format of '#RRGGBB'
  var red = parseInt(color.substring(1, 3), 16);
  var green = parseInt(color.substring(3, 5), 16);
  var blue = parseInt(color.substring(5, 7), 16);
  return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha +')';
}

incrementAlphaInColor = function(rgbaColor, amount) {
  var result = adjustAlphaInColor(rgbaColor, function(a) {
    var alpha = parseFloat(a);
    alpha += amount;
    if (alpha > 1.0) 
      alpha = 1.0;
    return alpha;
  });
  return result;
}

decrementAlphaInColor = function(rgbaColor, amount) {
  return adjustAlphaInColor(rgbaColor, function(a) {
    var alpha = parseFloat(a);
    alpha -= amount;
    if (alpha < 0.0) 
      alpha = 0.0;
    return alpha;
  });
}

function adjustAlphaInColor(rgbaColor, adjust) {
  var color = rgbColorFromRGBA(rgbaColor);
  var alpha = alphaFromRGBA(rgbaColor);
  alpha = adjust(alpha);
  return color + ',' + alpha + ')';
}

function rgbColorFromRGBA(rgbaColor) {
  var index = rgbaColor.lastIndexOf(',');
  if (index >= 0) {
    return rgbaColor.substring(0, index);
  }
}

alphaFromRGBA = function(rgbaColor) {
  var index = rgbaColor.lastIndexOf(',');
  if (index >= 0) {
    var end = rgbaColor.lastIndexOf(')');
    if (end >= 0) {
      return rgbaColor.substring(index + 1, end);
    }
  }
}

var prefix = 'rgba(';
rgbColorStringFromRGBA = function(rgbaColor) {
  var red = redValueFromRGBA(rgbaColor)
    , green = greenValueFromRGBA(rgbaColor)
    , blue = blueValueFromRGBA(rgbaColor);
  var commaIndex = -1;
  red = Number(red).toString(16);
  green = Number(green).toString(16);
  blue = Number(blue).toString(16);
  return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
}

function stripPrefixFromRGBA(rgbaColor) {
  var index = rgbaColor.indexOf(prefix);
  if (index >= 0) {
    return rgbaColor.substring(prefix.length);
  }
  return rgbaColor;
}

function redValueFromRGBA(rgbaColor) {
  var temp = stripPrefixFromRGBA(rgbaColor);
  var parts = temp.split(',');
  return parts[0];
}

function greenValueFromRGBA(rgbaColor) {
  var temp = stripPrefixFromRGBA(rgbaColor);
  var parts = temp.split(',');
  return parts[1];
}

function blueValueFromRGBA(rgbaColor) {
  var temp = stripPrefixFromRGBA(rgbaColor);
  var parts = temp.split(',');
  return parts[2];
}

if (typeof module !== 'undefined') {
  module.exports = Graphics;
}
