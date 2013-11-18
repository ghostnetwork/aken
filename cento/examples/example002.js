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

    configurePubSubSubscribers();
    configurePortConnectionMadeHandlers();
  }

  function configureProgramStartView() {
    var frame = Rectangle.create(100, 60, 50, 50);
    var label = 'Start';
    var action = Action.create(label, startProgram);
    var view = StartProgramView.create(frame, label, action);
    view.name = 'Program.Start.View';
    view.backgroundColor = colorWithAlpha('#00c700', 0.7);
    view.makeUnselectable();
    dogbone.addChild(view);
    startProgramView = view;
  }

  function configureProgramEndView() {
    var x = canvasSize.width - 60;
    var y = startProgramView.frame.origin.y;
    var frame = Rectangle.create(x, y, 50, 50);
    var label = 'End';
    var action = Action.create(label, endProgram);
    var view = EndProgramView.create(frame, label, action);
    view.name = 'Program.End.View';
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
      console.log('  ' + anAction.description);
    });
  }
  function endProgram() {console.log('endProgram');}

  function configureActionFactoryView() {
    var frame = Rectangle.create(10, 60, 50, 50);
    var view = ActionView.createWithNoPorts(frame, 'Action', function() {makeActionView();});
    view.name = 'Action.Factory.View';
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    view.makeUnselectable();
    view.makeUndraggable();
    dogbone.addChild(view);
    actionView = view;
  }

  function configureValueFactoryView() {
    var frame = Rectangle.create(10, 10, 50, 50);
    var view = ActionView.createWithNoPorts(frame, 'Value', function() {makeValueView();});
    view.name = 'Value.Factory.View';
    view.backgroundColor = colorWithAlpha('#c700c7', 0.7);
    view.makeUnselectable();
    view.makeUndraggable();
    dogbone.addChild(view);
    actionView = view;
  }

  function makeActionView() {
    var origin = determineViewOrigin();
    var size = Size.create(50, 50);
    var frame = Rectangle.createWithOriginAndSize(origin, size);
    var name = "Action." + numViews;
    var action = Action.create(name, function() {});
    var view = ActionView.create(frame, 'Action', action);
    view.name = "ActionView." + numViews;
    view.label = "Action " + numViews;
    view.backgroundColor = colorWithAlpha('#FF8000', 0.7);
    dogbone.addChild(view);

    autoConnect(view);
    lastAddedView = view;
  }

  function makeValueView() {
    var origin = viewOriginVerticalLayout();
    var size = Size.create(50, 50);
    var frame = Rectangle.createWithOriginAndSize(origin, size);
    var name = "Value." + numViews;
    var value = Value.create(0);
    value.description = "ValueView." + numViews;
    var view = ValueView.create(frame, value.toString(), value);
    view.name = "ValueView." + numViews;
    view.backgroundColor = colorWithAlpha('#c700c7', 0.7);
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

  function configurePubSubSubscribers() {
    PubSub.global.on(kDogboneDidRemoveChildren, function() {
      console.log('\n==============');
      console.log(kDogboneDidRemoveChildren);
      currentGridMap(startProgramView, function(actionView, inputPortSegmentView, outputPortSegmentView) {
        console.log('actionView: ' + actionView.name + ' (' + actionView.nextActionView.name + ')');
        logConnection(actionView, inputPortSegmentView, outputPortSegmentView);
      });
    });
  }

  function configurePortConnectionMadeHandlers() {
    PortConnect.global.on(kPortConnectMadeConnection, function(specJSON) {
      var spec = JSON.parse(specJSON);
      var segment = Segment.create(spec.segment);
      var connector = Connector.create(spec.connector);
      var segmentView = SegmentView.create(segment, connector);
      dogbone.mainView.addChild(segmentView);
      connectSegmentViewWithActionViews(segmentView);
    });

    PortConnect.global.on(kPortConnectDidAutoConnect, function(spec) {
      var sourceView = spec.sourceView;
      var destView = spec.destView;

      console.log('\n==============');
      currentGridMap(startProgramView, function(actionView, inputPortSegmentView, outputPortSegmentView) {
        console.log('actionView: ' + actionView.name + ' (' + actionView.nextActionView.name + ')');
        logConnection(actionView, inputPortSegmentView, outputPortSegmentView);
      });
    });
  }

  function logConnection(actionView, inputPortSegmentView, outputPortSegmentView) {
    if (existy(inputPortSegmentView)) {
        logConnectionBetween(actionView, inputPortSegmentView);
    } else if (existy(outputPortSegmentView)) {
        logConnectionBetween(actionView, outputPortSegmentView);
    }
  }

  function logConnectionBetween(actionView, segmentView) {
    if (canLogSegmentView(segmentView) && canLogActionView(actionView)) {
      var destName = actionView.hasNextActionView()
                          ? actionView.nextActionView.name
                          : 'End';
      var marked = existy(segmentView) ? segmentView.isToBeDeleted : undefined;
      console.log('segmentView: from: ' + actionView.name 
                + ' to: ' + destName
                + ' (marked: ' + marked + ')');
    }
  }

  function connectSegmentViewWithActionViews(segmentView) {
    gridMap(startProgramView, function(actionView) {
      if (actionViewInputPortMatchesSegmentViewEndPort(actionView, segmentView)) {
        actionView.inputPortSegmentView = segmentView;
        var prevActionView = actionViewBefore(actionView);
        if (existy(prevActionView)) {
          prevActionView.outputPortSegmentView = segmentView;
        }
      }
      if (actionViewOutputPortMatchesSegmentViewStartPort(actionView, segmentView)) {
        actionView.outputPortSegmentView = segmentView;
        if (actionView.hasNextActionView()) {
          actionView.nextActionView.inputPortSegmentView = segmentView;
        }
      }
    });
  }

  function actionViewInputPortMatchesSegmentViewEndPort(actionView, segmentView) {
    var inputPort = typeof actionView.inputPortView !== 'undefined'
                  ? actionView.inputPortView.port
                  : null;
    var endPort = typeof segmentView.connector !== 'undefined'
                ? segmentView.connector.endPort
                : null;
    return (existy(inputPort) && existy(endPort) && (inputPort.name === endPort.name));
  }

  function actionViewOutputPortMatchesSegmentViewStartPort(actionView, segmentView) {
    var outputPort = typeof actionView.outputPortView !== 'undefined'
                   ? actionView.outputPortView.port
                   : null;
    var startPort = typeof segmentView.connector !== 'undefined'
                  ? segmentView.connector.startPort
                  : null;
    return (existy(outputPort) && existy(startPort) && (outputPort.name === startPort.name));
  }

  function actionViewBefore(actionView) {
    var prevActionView = null;
    currentGridMap(startProgramView, function(childView, inputPortSegmentView, outputPortSegmentView) {
      if (childView.isConnectable() && childView.hasNextActionView()) {
        if (childView.nextActionView.name === actionView.name) {
          prevActionView = childView;
        }
      }
    });
    return prevActionView;
  }

  function currentGridMap(startView, worker) {
    var actionView = startView;
    worker(actionView, 
           actionView.inputPortSegmentView, 
           actionView.outputPortSegmentView);
    do {
      actionView = actionView.nextActionView;
      worker(actionView, 
             actionView.inputPortSegmentView, 
             actionView.outputPortSegmentView);
    } while(actionView.hasNextActionView());
  }

  function traverseGrid(startView) {
    console.log('\n==============');
    var actionView = startView;

    var inputPortSegmentView = startView.inputPortSegmentView;
    console.log('actionView: ' + actionView.name + ' (' + actionView.nextActionView.name + ')');
    logSegmentView(inputPortSegmentView);

    var outputPortSegmentView = startView.outputPortSegmentView;
    logSegmentView(outputPortSegmentView);

    do {
      actionView = actionView.nextActionView;
      console.log('actionView: ' + actionView.name + ' (' + actionView.nextActionView.name + ')');
      
      inputPortSegmentView = actionView.inputPortSegmentView;
      logSegmentView(inputPortSegmentView);

      outputPortSegmentView = actionView.outputPortSegmentView;
      logSegmentView(outputPortSegmentView);

    } while(actionView.hasNextActionView());
  }

  function canLogSegmentView(segmentView) {
    return (typeof segmentView !== 'undefined' 
         && existy(segmentView)
         && _.isFunction(segmentView.debugString));
  }

  function logSegmentView(segmentView) {
    if (typeof segmentView !== 'undefined' 
      && existy(segmentView)
      && _.isFunction(segmentView.debugString)) {
    //   console.log('segmentView: ' + segmentView.debugString());
    // }
    // if (canLogSegmentView(segmentView)) {
      console.log('segmentView: ' + segmentView.debugString());
    }
  }

  function canLogActionView(actionView) {
    return (typeof actionView !== 'undefined' 
         && existy(actionView));
  }

  var lastAddedView
    , startProgramView
    , endProgramView
    , actionView
    , numViews = 0;

  configure();
  return that;
}

gridMap = function(startView, worker) {
  var view = startView;
  worker(view);

  while(view.hasNextActionView()){
    view = view.nextActionView;
    worker(view);
  } 
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
