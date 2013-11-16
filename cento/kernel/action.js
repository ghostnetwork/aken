function Action(name, worker) {
  var that = {
    get name(){return _name;},
    get worker(){return _worker;}
  };

  that.perform = function(args) {if (worker) {worker(that, args);}}

  var _name = name
    , _worker = worker;
  return that;
}

Action.create = function(name, worker){return new Action(name, worker);};
Action.None = function(){return Action.create('None');};

if (typeof module !== 'undefined') {module.exports = Action;}