
function Tuple(spec) {
  var that = PubSub.create();
  
  Object.defineProperty(that, 'first', {get : function() {return _firstItem;},enumerable : true});
  Object.defineProperty(that, 'second', {get : function() {return _secondItem;},enumerable : true});

  that.map = function(worker) {return worker(that);};

  that.toString = function(){return '(' + that.first + ', ' + that.second + ')';};

  var _firstItem = spec.first
    , _secondItem = spec.second;

  return that;
}

Tuple.createWithSpec = function(spec){return new Tuple(spec);};

Tuple.createFromJSON = function(tupleJSON) {return Tuple.createWithSpec(JSON.parse(tupleJSON));};

if (typeof module !== 'undefined') {
  module.exports = Tuple;
  var util = require('util')
    , _ = require('underscore')
    , PubSub = require('../../verdoux/pubsub.js');
}
