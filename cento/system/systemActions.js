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

createValueSystemActionView = function(frame, createValueWorker) {
    var createValueName = 'Value';
    var createValueAction = Action.create(createValueName, createValueWorker);
    var valueView = ActionView.createWithNoPorts(frame, createValueName, createValueAction);
    valueView.name = 'System.Action.Create.View';
    valueView.backgroundColor = colorWithAlpha('#ffcc66', 0.7);
    valueView.makeUnselectable();
    valueView.makeUndraggable();
    return valueView;
}

createTupleSystemActionView = function(frame, createTupleWorker) {
    var createTupleName = 'Tuple';
    var createTupleAction = Action.create(createTupleName, createTupleWorker);
    var tupleView = TupleView.create({"frame":frame, "tupleAction":createTupleAction});
    tupleView.name = 'System.Action.Create.View';
    tupleView.backgroundColor = colorWithAlpha('#ff8ade', 0.7);
    tupleView.borderColor = tupleView.backgroundColor;
    tupleView.makeUnselectable();
    tupleView.makeUndraggable();
    return tupleView;
}

createSaveToLocalStorageSystemActionView = function(frame, saveViewWorker) {
  var saveViewName = 'Save';
  var saveViewAction = Action.create(saveViewName, saveViewWorker);
  var saveView = ActionView.createWithNoPorts(frame, saveViewName, saveViewAction);
  saveView.name = 'System.Action.View.Save.To.Local.Storage';
  saveView.backgroundColor = colorWithAlpha('#c700c7', 0.7);
  saveView.makeUnselectable();
  saveView.makeUndraggable();
  return saveView;
}
