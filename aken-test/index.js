'use strict';

var cento = require('../cento/cento.js')
  , util = require('util');

function AkenTest(options) {
  var that = {get options(){return _options;}};

  that.create = function(options) {return new AkenTest(options);};
  that.cento = cento;
  
  var _options = options;
  return that;
};

AkenTest.create = function(options) {return new AkenTest(options);};
AkenTest.prototype.log = function(message) {console.log.message(message);}

module.exports = AkenTest;
