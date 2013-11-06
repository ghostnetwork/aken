var kDropTargetItemEnter    = "droptarget.item.enter";
var kDropTargetItemExit     = "droptarget.item.exit";
var kDropTargetItemDropped  = "droptarget.item.dropped";

var acceptsDrop = function() {return true;};
var deniesDrop = function(){return false;};

function DragDrop() {
  var that = { 
    get isDragging(){return _isDragging;},
    get dropTargetCount(){return dropTargets.length;},
    get theDraggedItem(){return draggedItem;}
  };

  that.beginDrag = function(dragTarget, startPoint) {
    // Is this feature necessary?
    // - when a child view has been selected, we'll drag the parent around instead of the child
    // if (existy(dragTarget.parent)) {
    //   if (Dogbone.viewItNotChild(dragTarget)) {
    //     draggedItem = dragTarget.parent;
    //   }
    // }
    if (notExisty(draggedItem)) {
      draggedItem = dragTarget;
    }

    dragStartPoint = startPoint;
    offsetFromDraggedItemCenter = offsetFromCenter();
    _isDragging = dragTarget.isDraggable;
    origZOrder = draggedItem.zOrder;
    draggedItem.zOrder = ZORDER_TOP;
  }

  that.moveDrag = function(event) {
    var dragOffset = Point.create(event.clientX - dragStartPoint.x, event.clientY - dragStartPoint.y);
    var newX = draggedItem.frame.x + dragOffset.x;
    var newY = draggedItem.frame.y + dragOffset.y;

    draggedItem.moveTo(newX, newY);
    dragStartPoint.moveTo(event.clientX, event.clientY);

    checkForDraggedItemOverDropTarget(Point.createFromMouseEventWithClientCoords(event));
  }

  that.endDrag = function(event) {
    if (notExisty(draggedItem))
      return;

    var targets = sortDropTargetsZOrderDescending();
    var numTargets = targets.length;

    for (var i = numTargets - 1; i >= 0; i--) {
      var target = targets[i];

      if (target !== draggedItem && target.doesNotContainChild(draggedItem)) {
        if (target.frame.contains(Point.createFromMouseEventWithClientCoords(event))) {
          target.onDragEnd();
          target.pubsub.publish(kDropTargetItemDropped, draggedItem);
          break;
        }
      }
    };

    draggedItem.zOrder = origZOrder;
    origZOrder = undefined;
    draggedItem = undefined;
  }

  function sortDropTargetsZOrderDescending() {
    var targets = dropTargets.slice(0);
    targets.sort(function(a, b) {
      var result = 0;
      if (a.zOrder < b.zOrder)
        result = -1;
      else if (a.zOrder > b.zOrder)
        result = 1;
      return result;
    });
    return targets;
  }

  that.registerDropTarget = function(dropTarget) {dropTargets.push(dropTarget);}
  that.unregisterDropTarget = function(dropTarget) {
    var index = dropTargets.indexOf(dropTarget);
    if (index >= 0) {
      dropTargets.splice(index, 1);
    }
  }
  that.containsDropTarget = function(dropTarget) {return dropTargets.indexOf(dropTarget) === 0;}

  function offsetFromCenter() {
    var center = draggedItem.frame.center;
    var x = dragStartPoint.x - center.x ;
    var y = dragStartPoint.y - center.y;
    return Point.create(x, y);
  }

  function checkForDraggedItemOverDropTarget(mousePoint) {
    dropTargets.forEach(function(target) {
      if (not(target === draggedItem)) {
        if (existy(target.willAcceptDrop) && target.willAcceptDrop(draggedItem)) {
          if (target.frame.contains(mousePoint)) {
            target.onDragEnter();
            return;
          }
          else {
            target.onDragExit();
            return;
          }
        }
      }
    });
  }

  var draggedItem 
      , dragStartPoint
      , offsetFromDraggedItemCenter
      , origZOrder
      , dropTargets = [];

  var _isDragging = false;

  return that;
}

DragDrop.create = function(){return new DragDrop();};

if (typeof module !== 'undefined') {module.exports = DragDrop;}
