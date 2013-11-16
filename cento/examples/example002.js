function Example002(dogbone, canvasSize) {
  var that = {};
  
  function configure() {
    dogbone.mainView.backgroundColor = colorWithAlpha('#1D1E1A', 1.0);
    dogbone.mainView.highlightBgColor = dogbone.mainView.backgroundColor;
    dogbone.selectionFrameColor = colorWithAlpha('#ffffff', 1.0);

    configureProgramStartView();
    configureProgramEndView();
    configureActionFactoryView();
    configurePortConnectionMadeHandler();
  }

  function configureProgramStartView() {
    var frame = Rectangle.create(100, 60, 50, 50);
    var label = 'Start';
    var action = Action.create(label, startProgram);
    var view = StartProgramView.create(frame, label, action);
    view.name = 'Example002.Program.Start.View';
    view.backgroundColor = colorWithAlpha('#00c700', 0.7);
    view.makeUnselectable();
    dogbone.addChild(view);
    startProgramView = view;
  }

  function configureProgramEndView() {
    var x = canvasSize.width - 60;
    var y = startProgramView.frame.origin.y;
    var frame = Rectangle.create(x, y, 50, 50);
    var view = EndProgramView.create(frame, 'End', function() {endProgram();});
    view.name = 'Example002.Program.End.View';
    view.backgroundColor = colorWithAlpha('#c70000', 0.7);
    view.makeUnselectable();
    dogbone.addChild(view);
    endProgramView = view;
  }

  function startProgram() {
    console.log('startProgram');
    var program = Program.create('My Program');
    var firstAction = startProgramView.action.nextAction;
    console.log('firstAction: ' + firstAction.name);
    program.actionsMap(firstAction, function(anAction) {
      console.log('  ' + anAction.name);
    });
  }
  function endProgram() {console.log('endProgram');}

  function configureActionFactoryView() {
    var frame = Rectangle.create(10, 60, 50, 50);
    var view = ActionView.createWithNoPorts(frame, 'Action', function() {makeView();});
    view.name = 'Example002.Action.Factory.View';
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    view.makeUnselectable();
    view.makeUndraggable();
    dogbone.addChild(view);
    actionView = view;
  }

  function makeView() {
    var origin = determineViewOrigin();
    var size = Size.create(50, 50);
    var frame = Rectangle.createWithOriginAndSize(origin, size);
    var name = "Example002.Action." + numActionViews;
    var action = Action.create(name, function() {
      console.log(action.name + ' action being performed');
    });
    var view = ActionView.create(frame, 'Action', action);
    view.name = "Example002.ActionView." + numActionViews++;
    view.label = "Action " + numActionViews;
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    lastAddedView = view;
    dogbone.addChild(view);

    if (numActionViews === 1) {
      PortConnect.global.autoConnect(startProgramView, view);
    }
  }

  function determineViewOrigin() {
    var viewOrigin = Point.Empty;
    if (existy(lastAddedView)) {
      x = lastAddedView.frame.origin.x;
      y = lastAddedView.frame.origin.y + lastAddedView.frame.size.height + 10;
    }
    else {
      x = startProgramView.frame.right + 40;
      y = startProgramView.frame.origin.y;
    }
    return Point.create(x, y);
  }

  function configurePortConnectionMadeHandler() {
    PortConnect.global.on(kPortConnectMadeConnection, function(specJSON) {
      var spec = JSON.parse(specJSON);
      var segment = Segment.create(spec.segment);
      var connector = Connector.create(spec.connector);
      var segmentView = SegmentView.create(segment, connector);
      dogbone.mainView.addChild(segmentView);
    });
  }

  var lastAddedView
    , startProgramView
    , endProgramView
    , actionView
    , numActionViews = 0;

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
    , ActionView = require('../../cento/views/actionView.js')
    , Action = require('../../cento/kernel/action.js')
    , StartProgramView = require('../../cento/views/startProgramView.js')
    , SegmentView = require('../../cento/views/segmentView.js')
    , Segment = require('../../cento/kernel/geometry/segment.js')
    , PortConnect = require('../../cento/kernel/ports/portConnect.js')
    , PubSub = require('../../verdoux/pubsub.js');

}
