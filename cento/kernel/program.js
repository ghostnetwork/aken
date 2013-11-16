
function Program(name) {
  var that = Action.create(name, actionWorker);
  
  that.start = function(firstAction) {
    _isRunning = true;
    _firstAction = firstAction;
    that.actionsMap(firstAction, function(action) {
      action.perform(action);
    });
  }

  that.actionsMap = function(firstAction, worker) {
    if (typeof worker !== 'undefined') {worker(firstAction);}

    if (that.hasNextAction(firstAction)) {
      that.actionsMap(firstAction.nextAction, worker);
    }
  }

  that.hasNextAction = function(action) {
    return (typeof action.nextAction !== 'undefined') && (action !== Action.None);
  }
  
  that.end = function() {
    _isRunning = false;
  }

  function actionWorker() {console.log('actionWorker');};
  
  Object.defineProperty(that, 'isRunning', {get : function() {return _isRunning;},enumerable : true});
  Object.defineProperty(that, 'firstAction', {get : function() {return _firstAction;},enumerable : true});

  var _isRunning = false
    , _firstAction;

  return that;
}

Program.create = function(name){return new Program(name);};

if (typeof module !== 'undefined') {
  module.exports = Program;
  var util = require('util')
    , Action = require('./action.js')
    , PubSub = require('../../verdoux/pubsub.js');
}
