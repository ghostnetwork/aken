var Port = require('../../../../../cento/kernel/ports/port.js');
var InputPort = require('../../../../../cento/kernel/ports/inputPort.js');
var OutputPort = require('../../../../../cento/kernel/ports/outputPort.js');

(function() {
  'use strict';
  
  var kPortNumber = 23
    , kPort = Port.create(kPortNumber)
    , kInputPortNumber = 12345
    , kInputPort = InputPort.create(kInputPortNumber)
    , kOutputPortNumber = 54321
    , kOutputPort = OutputPort.create(kOutputPortNumber);
  
  PortFixtures.PortNumber = kPortNumber;
  PortFixtures.Port = kPort;
  PortFixtures.InputPortNumber = kInputPortNumber;
  PortFixtures.InputPort = kInputPort;
  PortFixtures.OutputPortNumber = kOutputPortNumber;
  PortFixtures.OutputPort = kOutputPort;

  function PortFixtures(){};
  PortFixtures.create = function() {return new PortFixtures();};
  module.exports = PortFixtures;

}).call(this);
