createViewSystemActionView = function(frame, createViewWorker) {
    var createViewName = 'View';
    var createViewAction = Action.create(createViewName, createViewWorker);
    var view = ActionView.createWithNoPorts(frame, createViewName, createViewAction);
    view.name = 'System.Action.Create.View';
    view.backgroundColor = colorWithAlpha('#00c7c7', 0.7);
    view.makeUnselectable();
    view.makeUndraggable();
    return view;
}

createSaveToLocalStorageSystemActionView = function(frame, saveViewWorker) {
  var y = frame.origin.y + frame.size.height + frame.origin.y;
  var saveViewPoint = Point.create(frame.origin.x, y);
  frame.moveToPoint(saveViewPoint);
  var saveViewName = 'Save';
  var saveViewAction = Action.create(saveViewName, saveViewWorker);
  var saveView = ActionView.createWithNoPorts(frame, saveViewName, saveViewAction);
  saveView.name = 'System.Action.View.Save.To.Local.Storage';
  saveView.backgroundColor = colorWithAlpha('#c700c7', 0.7);
  saveView.makeUnselectable();
  saveView.makeUndraggable();
  return saveView;
}
