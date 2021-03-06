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
    var origin = viewOriginHorizontalLayout();
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
  
    logModel();
}

  function makeValueView() {
    var value = Value.create(0);
    value.description = "Value." + numViews;

    var origin = viewOriginVerticalLayout();
    var size = Size.create(50, 50);
    var frame = Rectangle.createWithOriginAndSize(origin, size);
    var view = ValueView.create(frame, value);
    view.name = "ValueView." + numViews;
    view.backgroundColor = colorWithAlpha('#c700c7', 0.7);
    
    dogbone.addChild(view);

    autoConnect(view);
    lastAddedView = view;

    logModel();
  }

  function autoConnect(view) {
    var originView = null;

    if (numViews++ === 0) {originView = startProgramView;}
    else {originView = lastAddedView;}

    if (existy(originView)) {
      PortConnect.global.autoConnect(originView, view);
    }
  }

  function configurePortConnectionMadeHandlers() {
    PortConnect.global.on(kPortConnectMadeConnection, function(specJSON) {
      var spec = JSON.parse(specJSON);
      var segment = Segment.create(spec.segment);
      var connector = Connector.create(spec.connector);
      var segmentView = SegmentView.create(segment, connector);
      dogbone.mainView.addChild(segmentView);

      PortConnect.global.publish("did.add.segment.view", segmentView);
    });

    PubSub.global.on(kDogboneDidRemoveChildren, function(spec) {
      console.log('\n>>>---------------->');
      var deadSegmentViews = [];
      dogbone.mainView.displayListMap(function(childView) {
        if (SegmentView.isSegmentView(childView)) {
          console.log('  isMarkedForDeletion: ' + childView.isMarkedForDeletion);
          if (childView.isMarkedForDeletion) {
            deadSegmentViews.push(childView);
          }
        }
      });
      deadSegmentViews.forEach(function(deadSegmentView) {
        dogbone.removeChild(deadSegmentView);
      });

      console.log('\n++++++++++');
      var deadActions = [];
      traverseModel(function(action) {
        console.log('++ ' + action.description 
          + ' markedForDeletion: ' + action.isMarkedForDeletion);
        if (action.isMarkedForDeletion) {
          deadActions.push(action);
        }
      });
      deadActions.forEach(function(deadAction) {
        var prevAction = previousAction(deadAction);
        if (existy(prevAction)) {
          console.log(deadAction.name + '.prevAction: ' + prevAction.name);
          console.log('deadAction.hasNextAction: ' + deadAction.hasNextAction());
          if (deadAction.hasNextAction()) {
            prevAction.connectWith(deadAction.nextAction);
            var sourceView = viewForAction(prevAction);
            var destView = viewForAction(deadAction.nextAction);
            console.log(prevAction.name + '.nextAction.name: ' + prevAction.nextAction.name);
            if (existy(sourceView) && existy(destView)) {
              PortConnect.global.autoConnect(sourceView, destView);
            }
          }
        }
      });

    });
  }

  function previousAction(toAction) {
    var previousAction = null;
    traverseModel(function(action) {
      if (action.hasNextAction()) {
        if (action.nextAction.guid === toAction.guid) {
          previousAction = action;
        }
      }
    });
    return previousAction;
  }

  function viewForAction(action) {
    var view = null;
    dogbone.mainView.displayListMap(function(childView) {
      if (childView.isConnectable()) {
        if (childView.action.guid === action.guid) {
          view = childView;
        }
      }
    });
    return view;
  }

  function viewOriginHorizontalLayout() {
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

  function logModel() {
    traverseModel(function(action) {
      console.log(':: ' + action.description);
    })
  }

  function traverseModel(worker) {
    console.log('==============');
    modelMap(startProgramView.action, worker);
    console.log('');
  }

  function modelMap(startAction, worker) {
    var action = startAction;
    var isNotEnd = false;
    do {
      if (existy(action)) {
        worker(action);
      }
      action = action.nextAction;
      isNotEnd = action.isNotEndAction();
    } while (isNotEnd);
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
