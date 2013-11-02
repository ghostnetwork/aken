function Box(frame) {
  var that = Shape.create(frame);

  that.onRender = function(graphics) {
    graphics.drawFilledRect(that.frame, that.backgroundColor);
  };

  return that;
}

Box.create = function(frame){return new Box(frame);};
