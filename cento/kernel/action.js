function Action(name, worker) {
  var that = PubSub.create();

  that.perform = function(args) {if (worker) {worker(that, args);}}

  Object.defineProperty(that, 'name', {get : function() {return _name;},enumerable : true});
  Object.defineProperty(that, 'worker', {get : function() {return _worker;},enumerable : true});

  var _name = name
    , _worker = worker;

  return that;
}

Action.create = function(name, worker){return new Action(name, worker);};
Action.None = function(){return Action.create('None');};

if (typeof module !== 'undefined') {
  module.exports = Action;
  var util = require('util')
    , PubSub = require('../../verdoux/pubsub.js');
}