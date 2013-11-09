function Example002(mainView, canvasSize) {
  var that = {};
  
  function configure() {
    configureViewFactoryView();
  }

  function configureViewFactoryView() {
    var frame = Rectangle.create(10, 10, 50, 50);
    var view = ActionView.create(frame, function(actionView) {
      makeView();
    });
    view.name = 'Example002.ViewFactory.View';
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    view.makeUndraggable();
    mainView.addChild(view);
  }

  function makeView() {
    var name = "Example002.SquareView.Bottom." + (mainView.childCount - 1);
    var spec = {
        "name":name,
        "origin":Point.create(100, 10),
        "width":50,
        "rgbColorString":'#FFFFFF',
        "alpha":1.0,
      };
      mainView.addChild(ViewBuilder.SquareView.fromSpec(spec));
  }

  configure();
  return that;
}

Example002.create = function(mainView, canvasSize){return new Example002(mainView, canvasSize);};

if (typeof module !== 'undefined') {
  module.exports = Example002;
  var util = require('util')
    , View = require('../../dogbone/views/view.js')
    , ViewBuilder = require('../../dogbone/views/viewbuilder.js')
    , Point = require('../../dogbone/geometry/point.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , Dogbone = require('../../dogbone/dogbone.js')
    , ActionView = require('../../cento/views/kernel/actionView.js');

}
