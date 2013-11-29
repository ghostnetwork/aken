
function CentoMath() {
  var that = PubSub.create();
  return that;
}

CentoMath.plus = function(input) {
  var result = null;
  input.map(function(tuple) {result = tuple.first + tuple.second;});
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = CentoMath;
  var util = require('util')
    , _ = require('underscore')
    , PubSub = require('../../verdoux/pubsub.js');
}
