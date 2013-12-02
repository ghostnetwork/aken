
// spec: frame, tuple, tupleAction
function TupleView(spec) {
  var that = ActionView.createWithNoPorts(spec.frame, '', spec.tupleAction);
  
  Object.defineProperty(that, 'tuple', {get : function() {return _tuple;},enumerable : true});
  Object.defineProperty(that, 'tupleAction', {get : function() {return _tupleAction;},enumerable : true});

  that.type = 'TupleView';
  that.borderColor = colorWithAlpha('#ff8ade', 0.7);

  // var innerWidth = spec.frame.size.width - 10;
  that.renderBackground = function(graphics) {
    // var firstRect = Rectangle.create(that.frame.origin.x + 5, that.frame.origin.y + 5, innerWidth, 15);
    // var secondRect = Rectangle.create(
      // that.frame.origin.x + 5, that.frame.origin.y + that.frame.size.height - 20, innerWidth, 15);
    // graphics.drawRect(firstRect, that.backgroundColor);
    // graphics.drawRect(secondRect, that.backgroundColor);
  };

  function configurePorts() {
    that.enableOutputPort();
    var oneQuarterHeight = spec.frame.size.height / 4;
    var size = Size.create(10, 10);

    var firstOrigin = Point.create(spec.frame.origin.x - 10, spec.frame.origin.y + oneQuarterHeight);
    var firstFrame = Rectangle.createWithOriginAndSize(firstOrigin, size);
    var firstPort = InputPort.create(1);
    that.attachPortToView(firstFrame, firstPort);

    var secondOrigin = Point.create(spec.frame.origin.x - 10
                                  , spec.frame.origin.y + spec.frame.size.height - oneQuarterHeight - 10);
    var secondFrame = Rectangle.createWithOriginAndSize(secondOrigin, size);
    var secondPort = InputPort.create(1);
    that.attachPortToView(secondFrame, secondPort);
  }

  var _tuple = spec.tuple
    , _tupleAction = spec.tupleAction;

  configurePorts();

  return that;
}

TupleView.create = function(spec){return new TupleView(spec);};

if (typeof module !== 'undefined') {
  module.exports = TupleView;
  var util = require('util')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , Size = require('../../dogbone/geometry/size.js')
    , Point = require('../../dogbone/geometry/point.js')
    , InputPort = require('../kernel/ports/inputPort.js')
    , ActionView = require('./actionView.js');
}
