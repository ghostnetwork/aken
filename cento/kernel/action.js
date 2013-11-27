function Action(name, worker) {
  var that = PubSub.create();

  that.description = name;

  that.actionFromSpec = function(spec) {
    _name = spec.name;
    _worker = worker;
    _nextAction = spec.nextAction;
    _inputPort = spec.inputPort;
    _outputPort = spec.outputPort;
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

  Object.defineProperty(that, 'name', {get : function() {return _name;},enumerable : true});
  Object.defineProperty(that, 'worker', {get : function() {return _worker;},enumerable : true});
  Object.defineProperty(that, 'nextAction', {get : function() {return _nextAction;},enumerable : true});
  Object.defineProperty(that, 'inputPort', {get : function() {return _inputPort;},enumerable : true});
  Object.defineProperty(that, 'outputPort', {get : function() {return _outputPort;},enumerable : true});
  
  var _name = name
    , _worker = worker
    , _nextAction = Action.None
    , _inputPort
    , _outputPort;

  return that;
}

var actionDrone = function(){};
Action.create = function(name, worker){return new Action(name, worker);};

Action.createFromSpec = function(spec) {
  var action = Action.create(spec.name, spec.worker);
  action.actionFromSpec(spec);
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
}
// This needs to come after the above check of 'module'
// for the unit tests to run.
Action.None = Action.create('None', actionDrone);
