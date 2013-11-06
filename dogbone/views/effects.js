View.fadeIn = function(view, origBgColor, durationMS) {
  var alpha = alphaFromRGBA(origBgColor);
  fadeView(view, durationMS, alpha, incrementAlphaInColor);
};

View.fadeOut = function(view, durationMS) {
  var alpha = alphaFromRGBA(view.backgroundColor);
  fadeView(view, durationMS, alpha, decrementAlphaInColor);
};

function fadeView(view, durationMS, alpha, fade) {
  var pulseInterval = 15;
  var numSteps = durationMS / (pulseInterval + 1);
  var amount = alpha / numSteps;
  FX.start(pulseInterval, durationMS, function() {
    view.backgroundColor = fade(view.backgroundColor, amount);
  });
}

View.animatedMoveTo = function(view, startPoint, destPoint, durationMS) {
  var pulseInterval = 15;
  var numSteps = durationMS / (pulseInterval + 1);
  
  var deltaX = destPoint.x - startPoint.x;
  var deltaY = destPoint.y - startPoint.y;
  
  var amountX = deltaX / numSteps;
  var amountY = deltaY / numSteps;
  
  FX.start(pulseInterval, durationMS, function() {
    var x = view.frame.origin.x + amountX;
    var y = view.frame.origin.y + amountY;
    view.frame.origin.moveTo(x, y);
  });
}

View.animatedResize = function(view, origFrame, destFrame, durationMS) {
  var pulseInterval = 15;
  var numSteps = durationMS / (pulseInterval + 1);

  var deltaX = destFrame.origin.x - origFrame.origin.x;
  var deltaY = destFrame.origin.y - origFrame.origin.y;
  var deltaW = destFrame.size.width - origFrame.size.width;
  var deltaH = destFrame.size.height - origFrame.size.height;

  var amountX = deltaX / numSteps;
  var amountY = deltaY / numSteps;
  var amountW = deltaW / numSteps;
  var amountH = deltaH / numSteps;
  
  FX.start(pulseInterval, durationMS, function() {
    var x = view.frame.origin.x + amountX;
    var y = view.frame.origin.y + amountY;
    view.frame.moveTo(x, y);

    var w = view.frame.size.width + amountW;
    var h = view.frame.size.height + amountH;
    view.frame.resize(Size.create(w, h));
  });
}