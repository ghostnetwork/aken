
function DragDrop() {
  var that = { 
    get isDragging(){return _isDragging;}
  };

  that.beginDrag = function(dragTarget, startPoint) {
    draggedItem = dragTarget;
    dragStartPoint = startPoint;
    offsetFromDraggedItemCenter = offsetFromCenter();
    _isDragging = dragTarget.isDraggable;

    console.log('draggedItem: ' + inspect(dragTarget));
    console.log('dragStartPoint: ' + dragStartPoint.debugString());
    console.log('offsetFromDraggedItemCenter: ' + offsetFromDraggedItemCenter.debugString());
    console.log('that.isDragging: ' + that.isDragging);
  }

  function offsetFromCenter() {
    var center = draggedItem.frame.center;
    var x = center.x - dragStartPoint.x;
    var y = center.y - dragStartPoint.y;
    return Point.create(x, y);
  }

  var draggedItem 
      , dragStartPoint
      , offsetFromDraggedItemCenter;

  var _isDragging = false;

  return that;
}

DragDrop.create = function(){return new DragDrop();};

if (typeof module !== 'undefined') {module.exports = DragDrop;}
