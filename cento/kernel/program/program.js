
function Program(name, worker) {
  var that = Action.create(name, worker);

  that.push = function(action) {if (existy(action)) actions.push(action);};
  that.pop = function() {return actions.pop();};

  that.executeAsStack = function(){
    inReverseOrderDo(actions, function(action) {
      action.perform();
    });
  }

  function inReverseOrderDo(list, worker) {
    for (var i = list.length - 1; i >= 0; i--) {
      var item = list[i];
      worker(item);
    };
  }

  that.executeAsSequence = function() {
    for (var i = 0; i < actions.length; i++) {
      var action = actions[i];
      action.perform();
    };
  }

  Object.defineProperty(that, 'actionCount', {
    get : function() {return actions.length;},enumerable : true}
  );
  Object.defineProperty(that, 'currentAction', {
    get : function() {return actions.length;},enumerable : true}
  );

  var _currentAction = Action.None;
  var actions = [];
  return that;
}

Program.create = function(name, worker){return new Program(name, worker);};

if (typeof module !== 'undefined') {
  module.exports = Program;
  var util = require('util')
    , Action = require('../action/action.js');
}