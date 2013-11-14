function Example002(dogbone, canvasSize) {
  var that = {};
  
  function configure() {
    dogbone.mainView.backgroundColor = colorWithAlpha('#1D1E1A', 1.0);
    dogbone.mainView.highlightBgColor = dogbone.mainView.backgroundColor;
    dogbone.selectionFrameColor = colorWithAlpha('#ffffff', 1.0);
    configureViewFactoryView();

    PortConnect.global.on(kPortConnectMadeConnection, function(connector) {
      console.log('Example002.on(' + kPortConnectMadeConnection + ').connector: ' + connector.debugString());
    })
  }

  function configureViewFactoryView() {
    var frame = Rectangle.create(10, 10, 50, 50);
    var view = ActionView.createWithNoPorts(frame, 'Action', function(actionView) {makeView();});
    view.name = 'Example002.ViewFactory.View';
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    view.makeUnselectable();
    view.makeUndraggable();
    dogbone.addChild(view);
  }

  function makeView() {
    var origin = determineViewOrigin();
    var size = Size.create(50, 50);
    var frame = Rectangle.createWithOriginAndSize(origin, size);
    var view = ActionView.create(frame, 'Action');
    view.name = "Example002.ActionView." + (dogbone.childCount - 1);
    view.label = "Action " + (dogbone.childCount - 1);
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    lastAddedView = view;
    dogbone.addChild(view);
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
    , ActionView = require('../../cento/views/kernel/actionView.js')
    , PortConnect = require('../../cento/kernel/ports/portConnect.js')
    , PubSub = require('../../verdoux/pubsub.js');

}
