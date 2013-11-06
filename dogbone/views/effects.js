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