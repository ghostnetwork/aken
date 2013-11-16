function Action(name, worker) {
  var that = PubSub.create();

  that.connectWith = function(action) {_nextAction = action;};
  that.perform = function(args) {
    if (worker) {
      invokeAction(worker, args);
    }
  };

  Object.defineProperty(that, 'name', {get : function() {return _name;},enumerable : true});
  Object.defineProperty(that, 'worker', {get : function() {return _worker;},enumerable : true});
  Object.defineProperty(that, 'nextAction', {get : function() {return _nextAction;},enumerable : true});

  var _name = name
    , _worker = worker
    , _nextAction = Action.None;

  return that;
}

var actionDrone = function(){};
Action.create = function(name, worker){return new Action(name, worker);};

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
    , PubSub = require('../../verdoux/pubsub.js');
}
// This needs to come after the above check of 'module'
// for the unit tests to run.
Action.None = Action.create('None', actionDrone);