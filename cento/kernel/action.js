function Action(name, worker) {
  var that = PubSub.create();

  Object.defineProperty(that, 'worker', {get : function() {return _worker;},enumerable : true});
  Object.defineProperty(that, 'nextAction', {get : function() {return _nextAction;},enumerable : true});
  Object.defineProperty(that, 'inputPort', {get : function() {return _inputPort;},enumerable : true});
  Object.defineProperty(that, 'outputPort', {get : function() {return _outputPort;},enumerable : true});
  Object.defineProperty(that, 'isMarkedForDeletion', {get : function() {return _markedForDeletion;},enumerable : true});
  Object.defineProperty(that, 'guid', {get : function() {return _guid;},enumerable : true});

  that.name = name;
  that.description = name;

  that.actionFromSpec = function(spec) {
    _nextAction = spec.nextAction;
    _worker = spec.worker;
    _inputPort = spec.inputPort;
    _outputPort = spec.outputPort;
    that.name = spec.name;
    that.description = spec.description;
    return that;
  };

  that.perform = function(args) {
    if (worker) {
      invokeAction(worker, args);
    }
  };

  that.connectWith = function(action) {_nextAction = action;};
  that.disconnect = function(){_nextAction = Action.None;};

  that.enableInputPort = function(portNumber) {
    _inputPort = InputPort.create(portNumber);
  };
  that.enableOutputPort = function(portNumber) {
    _outputPort = OutputPort.create(portNumber);
  };

  that.markForDeletion = function() {_markedForDeletion = true;};

  that.isEndAction = function() {return that.name === Action.End.name;};
  that.isNotEndAction = function() {return not(that.isEndAction());};

  that.hasNextAction = function() {
    return typeof that.nextAction != 'undefined'
        && existy(that.nextAction);
  };
  
  var _worker = worker
    , _nextAction = Action.None
    , _inputPort
    , _outputPort
    , _markedForDeletion = false
    , _guid = guid();

  return that;
}

var actionDrone = function(){};
Action.create = function(name, worker){return new Action(name, worker);};

Action.createFromSpec = function(spec) {
  var action = Action.create(spec.name, spec.worker);
  action = action.actionFromSpec(spec);
  return action;
};

Action.createFromJSON = function(actionJSON) {return Action.createFromSpec(JSON.parse(actionJSON));};

invokeAction = function(action, args) { 
  if (action) {
    if (_.isFunction(action.perform)) {
      action.perform(args);
    } else {
      action(action, args);
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = Action;
  var util = require('util')
    , _ = require('underscore')
    , PubSub = require('../../verdoux/pubsub.js')
    , InputPort = require('./ports/inputPort.js')
    , OutputPort = require('./ports/outputPort.js');
  require('../../verdoux/guid.js');
}
// This needs to come after the above check of 'module'
// for the unit tests to run.
Action.None = Action.create('None', actionDrone);
Action.End = Action.None;
