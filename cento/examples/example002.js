function Example002(dogbone, canvasSize) {
  var that = {};
  
  function configure() {
    dogbone.mainView.backgroundColor = colorWithAlpha('#1D1E1A', 1.0);
    dogbone.mainView.highlightBgColor = dogbone.mainView.backgroundColor;
    dogbone.selectionFrameColor = colorWithAlpha('#ffffff', 1.0);

    configureProgramStartView();
    configureProgramEndView();
    configureActionFactoryView();
    configureValueFactoryView();
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
    program.actionsMap(firstAction, function(anAction) {
      console.log('  ' + anAction.name);
    });
  }
  function endProgram() {console.log('endProgram');}

  function configureActionFactoryView() {
    var frame = Rectangle.create(10, 60, 50, 50);
    var view = ActionView.createWithNoPorts(frame, 'Action', function() {makeActionView();});
    view.name = 'Example002.Action.Factory.View';
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    view.makeUnselectable();
    view.makeUndraggable();
    dogbone.addChild(view);
    actionView = view;
  }

  function makeActionView() {
    var origin = determineViewOrigin();
    var size = Size.create(50, 50);
    var frame = Rectangle.createWithOriginAndSize(origin, size);
    var name = "Example002.Action." + numViews;
    var action = Action.create(name, function() {});
    var view = ActionView.create(frame, 'Action', action);
    view.name = "Example002.ActionView." + numViews;
    view.label = "Action " + numViews;
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    dogbone.addChild(view);

    autoConnect(view);
    lastAddedView = view;
  }

  function autoConnect(view) {
    if (numViews++ === 0) {
      PortConnect.global.autoConnect(startProgramView, view);
    }
    else {
      PortConnect.global.autoConnect(lastAddedView, view);
    }
  }

  function determineViewOrigin() {
    var viewOrigin = Point.Empty;
    if (existy(lastAddedView)) {
      x = lastAddedView.frame.origin.x + lastAddedView.frame.size.width + 40;
      y = lastAddedView.frame.origin.y;
    }
    else {
      x = startProgramView.frame.right + 40;
      y = startProgramView.frame.origin.y;
    }
    return Point.create(x, y);
  }

  function viewOriginVerticalLayout() {
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

  function configureValueFactoryView() {
    var frame = Rectangle.create(10, 10, 50, 50);
    var view = ActionView.createWithNoPorts(frame, 'Value', function() {makeValueView();});
    view.name = 'Example002.Action.Factory.View';
    view.backgroundColor = colorWithAlpha('#c700c7', 0.7);
    view.makeUnselectable();
    view.makeUndraggable();
    dogbone.addChild(view);
    actionView = view;
  }

  function makeValueView() {
    var origin = viewOriginVerticalLayout();
    var size = Size.create(50, 50);
    var frame = Rectangle.createWithOriginAndSize(origin, size);
    var name = "Example002.Value." + numViews;
    var value = Value.create(0);
    var view = ValueView.create(frame, value.toString(), value);
    view.name = "Example002.ValueView." + numViews;
    view.backgroundColor = colorWithAlpha('#c700c7', 0.7);
    dogbone.addChild(view);

    autoConnect(view);
    lastAddedView = view;
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
    , numViews = 0;

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
