var kDropTargetItemEnter    = "droptarget.item.enter";
var kDropTargetItemExit     = "droptarget.item.exit";
var kDropTargetItemDropped  = "droptarget.item.dropped";

var acceptsDrop = function() {return true;};
var deniesDrop = function(){return false;};

function DragDrop() {
  var that = { 
    get isDragging(){return _isDragging;},
    get dropTargetCount(){return dropTargets.length;}
  };

  that.beginDrag = function(dragTarget, startPoint) {
    draggedItem = dragTarget;
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

    draggedItem.frame.moveTo(newX, newY);
    dragStartPoint.moveTo(event.clientX, event.clientY);

    var mousePoint = Point.createFromMouseEventWithClientCoords(event);
    checkForDraggedItemOverDropTarget(mousePoint, function(target, action) {
      target.pubsub.publish(action);
    });
  }

  that.endDrag = function() {
    var mousePoint = Point.createFromMouseEventWithClientCoords(event);
    checkForDraggedItemOverDropTarget(mousePoint, function(target, action) {
      if (action === kDropTargetItemEnter) {
        if (existy(target.acceptDrop)) {
          target.pubsub.publish(kDropTargetItemDropped, draggedItem);
        }
      }
    });

    draggedItem.zOrder = origZOrder;
    origZOrder = undefined;
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

  function checkForDraggedItemOverDropTarget(mousePoint, worker) {
    dropTargets.forEach(function(target) {
      if (not(target === draggedItem)) {
        if (existy(target.willAcceptDrop) && target.willAcceptDrop(draggedItem)) {
          if (target.frame.contains(mousePoint)) {
            worker(target, kDropTargetItemEnter);
          }
          else {
            worker(target, kDropTargetItemExit);
          }
        }
      }
    })
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
