function View(frame) {
  var that = Box.create(frame);

  Object.defineProperty(that, 'childCount', {get : function() {return displayList.length;},enumerable : true});

  that.update = function() {
    sortDisplayListByZOrder();
  };

  that.render = function(graphics) {
    graphics.drawFilledRect(that.frame, that.backgroundColor);
    displayList.forEach(function(shape) {
      shape.render(graphics);
    });
  };

  that.addChild = function(child) {
    if (existy(child)) {displayList.push(child);}
    return that;
  };

  that.removeChild = function(child) {
    if (existy(child)) {
      var index = displayList.indexOf(child);
      if (index >= 0) {
        var shape = displayList[index];
        displayList.splice(index, 1);
      }
    }
    return that;
  }

  that.frameContainsPoint = function(point, handler) {
    var didHit = false;
    displayListReverseOrder(function(shape) {
      if (not(didHit)) {
        didHit = shape.hitTest(point);
        if (didHit) {
          handler(shape);
          shape.onTouch();
        }
      }
    });

    if (not(didHit)) {
      if (that.frame.contains(point)) {
        handler(that);
        that.onTouch();
      }
    }
  }

  that.logDisplayList = function() {
    for (var i = 0; i < displayList.length; i++) {
      var shape = displayList[i];
      console.log(shape.frame.debugString() + '(' + shape.zOrder + ')');
    };
  }

  function sortDisplayListByZOrder() {
    displayList.sort(function(a, b) {
      var result = 0;
      if (a.zOrder < b.zOrder)
        result = -1;
      else if (a.zOrder > b.zOrder)
        result = 1;
      return result;
    });
  }

  function displayListReverseOrder(worker) {
    for (var i = displayList.length - 1; i >= 0; i--) {
      var shape = displayList[i];
      worker(shape);
    };
  }

  var displayList = [];
  return that;
}

View.create = function(frame){return new View(frame);};

if (typeof module !== 'undefined') {
  module.exports = View;
  var util = require('util');
  var Graphics = require('../graphics.js')
    , Shape = require('../shapes/shape.js')
    , Box = require('../shapes/box.js');
}
