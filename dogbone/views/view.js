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
    that.renderBackground(graphics);
    that.renderBorder(graphics);
    that.renderLabel(graphics);
    that.renderChildren(graphics);
    that.onRender(graphics);
  };

  that.renderBackground = function(graphics) {
    graphics.drawFilledRect(that.frame, that.backgroundColor);
  }

  that.renderBorder = function(graphics) {
    if (existy(that.borderColor)) {graphics.drawRect(that.frame, that.borderColor);}
  }

  that.renderLabel = function(graphics) {
    if (existy(that.label) && that.label.length > 0) {
      var fontSize = 11;
      var color = colorWithAlpha('#000000', 1.0);
      var style = {"color":color, "font":"bold " + fontSize + "px sans-serif"};
      var labelSize = graphics.measureText(that.label, style);
      var x = that.frame.center.x - labelSize.width / 2;
      var y = that.frame.origin.y + that.frame.size.height - 6;
      var where = Point.create(x, y);
      graphics.drawText(that.label, where, style);
    }
  }

  that.renderChildren = function(graphics) {
    displayList.forEach(function(shape) {shape.render(graphics);});
  }
  
  that.onRender = function(graphics){};

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
 
  that.displayListMap = function(action) {
    displayList.forEach(function(shape) {
      action(shape);
    });
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
          return;
        }
        // Recursively check to see if shape's children are hit
        shape.frameContainsPoint(point, handler);
      }
    });

    if (not(didHit)) {
      if (that.frame.contains(point)) {
        handler(that);
        that.onTouch();
      }
    }
  }

  that.borderColor;
  that.clearBorderColor = function() {that.borderColor = undefined;};

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

  that.moveBy = function(delta) {
    var x = that.frame.origin.x + delta.x;
    var y = that.frame.origin.y + delta.y;
    that.moveTo(x, y);
  }

  that.onMoved = function(delta) {moveChildren(delta);}

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
    , DragDrop = require('../dragdrop.js')
    , Point = require('../geometry/point.js');
}
