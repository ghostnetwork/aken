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
