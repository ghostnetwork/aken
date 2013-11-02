function View(frame) {
  var that = Shape.create(frame);

  that.update = function() {
    sortDisplayListByZOrder();
  };

  that.render = function(graphics) {
    displayList.forEach(function(shape) {
      shape.render(graphics);
    });
  };

  that.addChild = function(child) { 
    var numChildren = displayList.push(child);
    inspect(displayList);
    return that;
  };

  that.removeChild = function(child) {
    var index = displayList.indexOf(child);
    if (index >= 0) {
      var shape = displayList[index];
      displayList.splice(index, 1);
    }
    inspect(displayList);
    return that;
  }

  that.hitTest = function(point, handler) {
    var didHit = false;
    displayListReverseOrder(function(shape) {
      if (shape.hitTest(point) && not(didHit)) {
        handler(shape);
        shape.onTouch();
        didHit = true;
      }
    });
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
  var Graphics = require('../graphics.js')
    , Shape = require('../shapes/shape.js');
}
