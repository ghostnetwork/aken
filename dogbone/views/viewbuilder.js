function ViewBuilder() {return {};}

ViewBuilder.View = {};
ViewBuilder.View.fromRectangle = function(rectangle) {return View.create(rectangle);};

ViewBuilder.SquareView = {};
ViewBuilder.SquareView.create = function(origin, width, rgbColorString, alpha) {
  var rectangle = Rectangle.create(origin.x, origin.y, width, width);
  var view = View.create(rectangle);
  view.backgroundColor = colorWithAlpha(rgbColorString, alpha);
  return view;
};

ViewBuilder.SquareView.fromSpec = function(spec) {
  var view = ViewBuilder.SquareView.create(spec.origin, spec.width, spec.rgbColorString, spec.alpha);
  view.name = spec.name;
  return view;
};

if (typeof module !== 'undefined') {
  module.exports = ViewBuilder;
  var util = require('util')
    , Rectangle = require('../geometry/rectangle.js')
    , View = require('./view.js');
}
