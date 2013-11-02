function Box(frame) {
  var that = Shape.create(frame);

  that.render = function(graphics) {
    graphics.clearRect(that.frame);
    graphics.drawFilledRect(that.frame, that.backgroundColor);
  };

  return that;
}

Box.create = function(frame){return new Box(frame);};
