
function OutputPort(number) {
  var that = Port.create(number);
  
  Object.defineProperty(that, 'type', {get : function() {return 'Output';},enumerable : true});

  return that;
}

OutputPort.create = function(number){return new OutputPort(number);};

if (typeof module !== 'undefined') {
  module.exports = OutputPort;
  var util = require('util')
    , Port = require('./port.js');
}