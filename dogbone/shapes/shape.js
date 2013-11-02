function Shape(frame) {
  var that = {
    get frame(){return _frame;},
    get bounds(){return _frame.size;}
  };

  that.backgroundColor = colorWithAlpha('#FFFFFF', 1.0);

  that.render = function(graphics){
    graphics.clearRect(that.frame);
    graphics.drawFilledRect(that.frame, that.backgroundColor);
  };

  var _frame = frame;
  return that;
}

Shape.create = function(frame){return new Shape(frame);};
