
function Example003(spec) {
  var that = {
    get sysActionStartFrame(){return _sysActionStartFrame;},
    get workshopFrame(){return _workshopFrame;},
    get workshopView(){return _workshopView;}
  };

  var canvasSize = spec.canvasSize
    , dogbone = spec.dogbone
    , canvas = spec.canvas
    // , lastAddedViewFrame = Rectangle.Empty
    , _sysActionStartFrame = null
    , _workshopFrame = null
    , _workshopView = null;

  var kExample003MainViewKey = "Example003.MainView";

  dogbone.mainView.backgroundColor = colorWithAlpha('#1D1E1A', 1.0);
  dogbone.mainView.highlightBgColor = dogbone.mainView.backgroundColor;
  dogbone.selectionFrameColor = colorWithAlpha('#ffffff', 1.0);

  function initializeSystemViews() {
    createSystemActionStartFrame();
    createWorkshopFrame();
    createSystemActions();
    createWorkshopView();
  }

  function createSystemActionStartFrame() {
    _sysActionStartFrame = Rectangle.createWithOriginAndSize(Point.create(10, 10), Size.create(50, 50));
  }

  function createWorkshopFrame() {
    var x = that.sysActionStartFrame.size.width + (that.sysActionStartFrame.origin.x * 2);
    var y = that.sysActionStartFrame.size.height + (that.sysActionStartFrame.origin.y * 2);
    var origin = Point.create(x, y);
    var width = canvasSize.width - ((that.sysActionStartFrame.size.width * 2) - (that.sysActionStartFrame.origin.x * 2));
    var height = canvasSize.height - (x + that.sysActionStartFrame.origin.y);
    var size = Size.create(width, height);
    _workshopFrame = Rectangle.createWithOriginAndSize(origin, size);
  }

  function createSystemActions() {
    var startFrame = that.sysActionStartFrame.clone();

    createTopRowActions();
    createLeftColumnActions();
  }

  function createTopRowActions() {
    var saveViewFrame = that.sysActionStartFrame.clone();
    var x = (that.workshopFrame.origin.x + that.workshopFrame.size.width) - that.sysActionStartFrame.size.width;
    var y = that.sysActionStartFrame.origin.y;
    var position = Point.create(x, y);
    saveViewFrame.moveToPoint(position);
    var saveView = createSaveToLocalStorageSystemActionView(saveViewFrame, saveToLocalStorage);
    dogbone.addChild(saveView);

    x = saveViewFrame.x - saveViewFrame.width - (that.sysActionStartFrame.y * 2);
    y = saveViewFrame.y;
    var width = that.sysActionStartFrame.size.width;
    var height = that.sysActionStartFrame.size.height;
    var triangleFrame = Rectangle.create(x, y, width, height);
    var triangleView = TriangleView.create(triangleFrame);
    triangleView.makeUnselectable();
    triangleView.makeUndraggable();
    dogbone.addChild(triangleView);

    /*
    y = triangleFrame.bottom + (that.sysActionStartFrame.y * 2);
    var rightTriangleFrame = Rectangle.create(x, y, width, height);
    var rightTriangleView = RightTriangleView.create(rightTriangleFrame);
    rightTriangleView.makeUnselectable();
    rightTriangleView.makeUndraggable();
    dogbone.addChild(rightTriangleView);

    y = rightTriangleFrame.bottom + (that.sysActionStartFrame.y * 2);
    var leftTriangleFrame = Rectangle.create(x, y, width, height);
    var leftTriangleView = LeftTriangleView.create(leftTriangleFrame);
    leftTriangleView.makeUnselectable();
    leftTriangleView.makeUndraggable();
    dogbone.addChild(leftTriangleView);

    y = leftTriangleFrame.bottom + (that.sysActionStartFrame.y * 2);
    var downTriangleFrame = Rectangle.create(x, y, width, height);
    var downTriangleView = DownTriangleView.create(downTriangleFrame);
    downTriangleView.makeUnselectable();
    downTriangleView.makeUndraggable();
    dogbone.addChild(downTriangleView);
    */
  }

  function createLeftColumnActions() {
    var createView = createViewSystemActionView(that.sysActionStartFrame.clone(), createViewAndAddToWorkshop);
    dogbone.addChild(createView);
    
    var x = that.sysActionStartFrame.origin.x;
    var y = that.sysActionStartFrame.bottom + (that.sysActionStartFrame.y * 2);
    var width = that.sysActionStartFrame.size.width;
    var height = that.sysActionStartFrame.size.height;
    var createValueFrame = Rectangle.create(x, y, width, height);
    var createValueView = createValueSystemActionView(createValueFrame, createValueAndAddToWorkshop);
    dogbone.addChild(createValueView);

    y = createValueFrame.bottom + (that.sysActionStartFrame.y * 2);
    var w = width / 4;
    var tupleFrame = Rectangle.create(x, y, width, height);
    var tupleView = createTupleSystemActionView(tupleFrame, createTupleAndAddToWorkshop);
    tupleView.makeUnselectable();
    tupleView.makeUndraggable();
    dogbone.addChild(tupleView);
  }

  function createWorkshopView() {
    _workshopView = View.create(that.workshopFrame);
    _workshopView.backgroundColor = colorWithAlpha('#c70000', 0.2);
    _workshopView.zOrder = -2000;
    _workshopView.makeUnselectable();
    _workshopView.makeUndraggable();
    _workshopView.label = 'Workshop.View';
    dogbone.addChild(_workshopView);
  }

  // LocalStorage.removeItem(kExample003MainViewKey);

  (function(){
    initializeSystemViews();
    loadWorkshopeViewFromLocalStorage();
  })();

  function viewFactoryForSpec(viewSpec) {
    var viewType = viewSpec.type;
    if (typeof  viewType == 'undefined' || notExisty(viewType)) {
      return;
    }

    var result = function(spec){console.log('default viewFactory; does nothing');};

    switch(viewType) {
      case "ActionView": result = ActionView.createFromSpec; break;
      case "Box": result = Shape.createFromSpec; break;
      case "CentoView": result = CentoView.createFromSpec; break;
      case "EndProgramView": result = EndProgramView.createFromSpec; break;
      case "ImageView": result = ImageView.createFromSpec; break;
      case "PortView": result = PortView.createFromSpec; break;
      case "SegmentView": result = SegmentView.createFromSpec; break;
      case "Shape": result = Shape.createFromSpec; break;
      case "StartProgramView": result = StartProgramView.createFromSpec; break;
      case "ValueView": result = ValueView.createFromSpec; break;
      case "View": result = View.createFromSpec; break;
    }

    return result;
  }

  function createViewAndAddToWorkshop() {
    var origX = that.workshopView.frame.origin.x 
              + that.sysActionStartFrame.origin.x 
              + (that.workshopView.childCount * that.sysActionStartFrame.origin.x);
    var origY = that.workshopFrame.origin.y + that.sysActionStartFrame.origin.y;
    var offsetX = that.workshopView.childCount * that.sysActionStartFrame.size.width;
    var origin = Point.create(origX + offsetX, origY);
    var frame = Rectangle.createWithOriginAndSize(origin, that.sysActionStartFrame.size);

    var clonedView = View.create(frame);
    clonedView.name = "View." + that.workshopView.childCount;
    clonedView.backgroundColor = colorWithAlpha('#00c7c7', 0.7);

    that.workshopView.addChild(clonedView);
  }

  function createValueAndAddToWorkshop() {
    var x, y;
    var numKids = that.workshopView.childCount;
    if (numKids > 0) {
      var lastAddedView = that.workshopView.children[numKids - 1];
      x = lastAddedView.frame.origin.x;
      y = lastAddedView.frame.origin.y + that.sysActionStartFrame.size.height + that.sysActionStartFrame.y;
    }
    else {
      x = that.workshopFrame.origin.x + that.sysActionStartFrame.origin.x;
      y = that.workshopFrame.origin.y + that.sysActionStartFrame.origin.y;
    }

    var origin = Point.create(x, y);
    var frame = Rectangle.createWithOriginAndSize(origin, that.sysActionStartFrame.size);
    var value = Value.create(0);
    var clonedView = ValueView.create(frame, value);
    clonedView.name = "ValueView." + that.workshopView.childCount;
    clonedView.backgroundColor = colorWithAlpha('#ffcc66', 0.7);

    that.workshopView.addChild(clonedView);
  }

  function createTupleAndAddToWorkshop() {
    var x, y;
    var numKids = that.workshopView.childCount;
    if (numKids > 0) {
      var lastAddedView = that.workshopView.children[numKids - 1];
      x = lastAddedView.frame.origin.x;
      y = lastAddedView.frame.origin.y + that.sysActionStartFrame.size.height + that.sysActionStartFrame.y;
    }
    else {
      x = that.workshopFrame.origin.x + that.sysActionStartFrame.origin.x;
      y = that.workshopFrame.origin.y + that.sysActionStartFrame.origin.y;
    }

    var origin = Point.create(x, y);
    var frame = Rectangle.createWithOriginAndSize(origin, that.sysActionStartFrame.size);
    var action = Action.create('TupleAction', function(){});
    var clonedView = TupleView.create({"frame":frame, "tupleAction":action});
    clonedView.name = "TupleView." + that.workshopView.childCount;
    clonedView.backgroundColor = colorWithAlpha('#ff8ade', 0.7);

    that.workshopView.addChild(clonedView);
  }

  function saveToLocalStorage() {
    var data = View.toJSON(that.workshopView);
    LocalStorage.setItem(kExample003MainViewKey, data);

    // TODO: Alert user before automatically blowing away the current contents
    // var mainViewJSON = LocalStorage.getItem(kExample003MainViewKey);
    // if (notExisty(mainViewJSON)) {
    //   var data = View.toJSON(dogbone.mainView);
    //   LocalStorage.setItem(kExample003MainViewKey, data);
    // }
  }

  function loadWorkshopeViewFromLocalStorage()   {
    var mainViewJSON = LocalStorage.getItem(kExample003MainViewKey);
    if (existy(mainViewJSON)) {
      var mainViewObj = View.fromJSON(mainViewJSON);

      for (var i = 0; i < mainViewObj.children.length; i++) {
        var viewSpec = mainViewObj.children[i];

        var childView = null;
        var viewFactory = viewFactoryForSpec(viewSpec);
        if (existy(viewFactory)) {
          childView = viewFactory(viewSpec);
          childView.unselect();
        }
        that.workshopView.addChild(childView);
      };
    }
  }

  return that;
}

Example003.create = function(spec){return new Example003(spec);};

if (typeof module !== 'undefined') {module.exports = Example003;}
