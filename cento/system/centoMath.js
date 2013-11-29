
function CentoMath() {
  var that = PubSub.create();
  return that;
}

CentoMath.plus = function(input) {return drone(input, function(tuple) {return tuple.first + tuple.second;});};
CentoMath.minus = function(input) {return drone(input, function(tuple) {return tuple.first - tuple.second;});};
CentoMath.multiply = function(input) {return drone(input, function(tuple) {return tuple.first * tuple.second;});};
CentoMath.divide = function(input) {return drone(input, function(tuple) {return tuple.first / tuple.second;});};

function drone(input, worker) {return input.map(worker);}

if (typeof module !== 'undefined') {
  module.exports = CentoMath;
  var util = require('util')
    , _ = require('underscore')
    , PubSub = require('../../verdoux/pubsub.js');
}
