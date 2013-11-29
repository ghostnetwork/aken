function Box(frame) {
  var that = Shape.create(frame);

  that.type = 'Box';
  
  that.onRender = function(graphics) {
    graphics.drawFilledRect(that.frame, that.backgroundColor);
  };

  return that;
}

Box.create = function(frame){return new Box(frame);};

if (typeof module !== 'undefined') {
  module.exports = Box;
  var util = require('util');
  var Graphics = require('../graphics.js')
    , Shape = require('./shape.js');
}
