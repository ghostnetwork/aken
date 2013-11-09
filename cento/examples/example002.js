function Example002(dogbone, canvasSize) {
  var that = {};
  
  function configure() {
    dogbone.mainView.backgroundColor = colorWithAlpha('#1D1E1A', 1.0);
    dogbone.selectionFrameColor = colorWithAlpha('#ffffff', 1.0);
    configureViewFactoryView();
  }

  function configureViewFactoryView() {
    var frame = Rectangle.create(10, 10, 50, 50);
    var view = ActionView.create(frame, 'Action', function(actionView) {makeView();});
    view.name = 'Example002.ViewFactory.View';
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    view.makeUndraggable();
    dogbone.addChild(view);
  }

  function makeView() {
    var name = "Example002.SquareView.Bottom." + (dogbone.childCount - 1);
    var label = "Action " + (dogbone.childCount - 1);
    var spec = {
        "name":name,
        "origin":determineViewOrigin(),
        "width":50,
        "rgbColorString":determineViewBgColor(),
        "alpha":determineViewBgAlpha(),
      };
      var view = ViewBuilder.SquareView.fromSpec(spec);
      view.label = label;
      lastAddedView = view;
      dogbone.addChild(view);
  }

  function determineViewBgColor() {
    if (existy(lastAddedView)) {
      return rgbColorStringFromRGBA(lastAddedView.backgroundColor);
    }
    else {
      return '#FF8000';
    }
  }

  function determineViewBgAlpha() {
    if (existy(lastAddedView)) {
      return alphaFromRGBA(lastAddedView.backgroundColor);
    }
    else {
      return 0.7;
    }
  }

  function determineViewOrigin() {
    var viewOrigin = Point.Empty;
    if (existy(lastAddedView)) {
      x = lastAddedView.frame.origin.x;
      y = lastAddedView.frame.origin.y + lastAddedView.frame.size.height + 10;
    }
    else {
      x = 100;
      y = 10;
    }
    return Point.create(x, y);
  }

  var lastAddedView;

  configure();
  return that;
}

Example002.create = function(dogbone, canvasSize){return new Example002(dogbone, canvasSize);};

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
