function View(frame) {
  var that = Box.create(frame);

  Object.defineProperty(that, 'childCount', {get : function() {
    return displayList.length;},enumerable : true
  });
  Object.defineProperty(that, 'center', {get : function() {
    return that.frame.center;},enumerable : true
  });

  that.update = function() {sortDisplayListByZOrder();};

  that.render = function(graphics) {
    graphics.drawFilledRect(that.frame, that.backgroundColor);
    displayList.forEach(function(shape) {
      shape.render(graphics);
    });
  };

  that.addChild = function(child) {
    if (existy(child)) {
      displayList.push(child);
      child.parent = that;
    }
    return that;
  };

  that.removeChild = function(child) {
    if (existy(child)) {
      var index = displayList.indexOf(child);
      if (index >= 0) {
        var shape = displayList[index];
        displayList.splice(index, 1);
        child.parent = null;
      }
    }
    return that;
  }

  that.transferChild = function(child) {
    if (existy(child)) {
      if (existy(child.parent)) {
        child.parent.removeChild(child);
      }
      that.addChild(child);
    }
  }

  that.containsChild = function(child) {return (existy(child)) ? displayList.indexOf(child) >= 0 : false;};
  that.doesNotContainChild = function(child) {return not(that.containsChild(child));};

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

  function configure() {
    that.pubsub.on(kDropTargetItemDropped, function(item) {
      if (existy(item)) {
        that.transferChild(item);
      }
    });
  }

  that.moveTo = function(x, y) {
    var delta = Point.create(x - that.frame.origin.x, y - that.frame.origin.y);
    that.frame.origin.moveTo(x, y);
    that.onMoved(delta);
  }

  that.onMoved = function(delta) {
    moveChildren(delta);
  }

  function moveChildren(delta) {
    displayList.forEach(function(child) {
      var x = child.frame.origin.x + delta.x;
      var y = child.frame.origin.y + delta.y;
      child.moveTo(x, y);
    });
  }

  configure();

  var displayList = []
    , parent
    , previousOrigin;

  return that;
}

View.create = function(frame){return new View(frame);};

if (typeof module !== 'undefined') {
  module.exports = View;
  var util = require('util');
  var Graphics = require('../graphics.js')
    , Shape = require('../shapes/shape.js')
    , Box = require('../shapes/box.js')
    , DragDrop = require('../dragdrop.js');
}
