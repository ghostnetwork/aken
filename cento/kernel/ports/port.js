
function Port(number) {
  var that = PubSub.create();

  Object.defineProperty(that, 'number', {get : function() {return _number;},enumerable : true});
  Object.defineProperty(that, 'name', {get : function() {return that.type +  'Port.' + that.number;},enumerable : true});
  
  var _number = number;

  return that;
}

Port.create = function(number){return new Port(number);};

if (typeof module !== 'undefined') {
  module.exports = Port;
  var util = require('util')
    , PubSub = require('../../../verdoux/pubsub.js'); 
  }