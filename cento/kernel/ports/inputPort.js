
function InputPort(number) {
  var that = Port.create(number);
  
  Object.defineProperty(that, 'type', {get : function() {return 'Input';},enumerable : true});
  return that;
}

InputPort.create = function(number){return new InputPort(number);};

if (typeof module !== 'undefined') {
  module.exports = InputPort;
  var util = require('util')
    , Port = require('./port.js');
}