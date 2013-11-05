
function DragDrop() {
  var that = { 
    get isDragging(){return _isDragging;}
  };

  that.beginDrag = function(dragTarget, startPoint) {
    draggedItem = dragTarget;
    console.log('draggedItem: ' + inspect(dragTarget));

    dragStartPoint = startPoint;
    console.log('dragStartPoint: ' + dragStartPoint.debugString());

    offsetFromDraggedItemCenter = offsetFromCenter();
    console.log('offsetFromDraggedItemCenter: ' + offsetFromDraggedItemCenter.debugString());

    _isDragging = true;
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
