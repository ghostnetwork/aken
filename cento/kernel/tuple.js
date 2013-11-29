
function Tuple(spec) {
  var that = PubSub.create();
  
  Object.defineProperty(that, 'first', {get : function() {return _firstItem;},enumerable : true});
  Object.defineProperty(that, 'second', {get : function() {return _secondItem;},enumerable : true});

  that.map = function(worker) {return worker(that);};

  var _firstItem = spec.first
    , _secondItem = spec.second;

  return that;
}

Tuple.createWithSpec = function(spec){return new Tuple(spec);};
Tuple.create = function(first, second){return Tuple.createWithSpec({"first":first, "second":second});};

if (typeof module !== 'undefined') {
  module.exports = Tuple;
  var util = require('util')
    , _ = require('underscore')
    , PubSub = require('../../verdoux/pubsub.js');
}
