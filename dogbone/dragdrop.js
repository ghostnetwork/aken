
function DragDrop() {
  var that = { 
    get isDragging(){return _isDragging;}
  };

  that.beginDrag = function(dragTarget, startPoint) {
    draggedItem = dragTarget;
    dragStartPoint = startPoint;
    offsetFromDraggedItemCenter = offsetFromCenter();
    _isDragging = dragTarget.isDraggable;
    origZOrder = draggedItem.zOrder;

    draggedItem.zOrder = ZORDER_TOP;

    // console.log('draggedItem: ' + inspect(dragTarget));
    // console.log('dragStartPoint: ' + dragStartPoint.debugString());
    // console.log('offsetFromDraggedItemCenter: ' + offsetFromDraggedItemCenter.debugString());
    // console.log('that.isDragging: ' + that.isDragging);
  }

  that.moveDrag = function(event) {
    var dragOffset = Point.create(event.clientX - dragStartPoint.x, event.clientY - dragStartPoint.y);
    var newX = draggedItem.frame.x + dragOffset.x;
    var newY = draggedItem.frame.y + dragOffset.y;

    draggedItem.frame.moveTo(newX, newY);
    dragStartPoint.moveTo(event.clientX, event.clientY);
  }

  that.endDrag = function() {
    draggedItem.zOrder = origZOrder;
  }

  function offsetFromCenter() {
    var center = draggedItem.frame.center;
    var x = dragStartPoint.x - center.x ;
    var y = dragStartPoint.y - center.y;
    return Point.create(x, y);
  }

  var draggedItem 
      , dragStartPoint
      , offsetFromDraggedItemCenter
      , origZOrder;

  var _isDragging = false;

  return that;
}

DragDrop.create = function(){return new DragDrop();};

if (typeof module !== 'undefined') {module.exports = DragDrop;}
