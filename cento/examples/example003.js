
function Example003(spec) {
  var that = {
    get sysActionStartFrame(){return _sysActionStartFrame;},
    get workshopFrame(){return _workshopFrame;},
    get workshopView(){return _workshopView;}
  };

  var canvasSize = spec.canvasSize
    , dogbone = spec.dogbone
    , canvas = spec.canvas
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
    var createView = createViewSystemActionView(startFrame.clone(), createViewAndAddToWorkshop);
    dogbone.addChild(createView);

    var saveViewFrame = startFrame.clone();
    var x = (that.workshopFrame.origin.x + that.workshopFrame.size.width) - that.sysActionStartFrame.size.width;
    var position = Point.create(x, startFrame.origin.y);
    saveViewFrame.moveToPoint(position);
    var saveView = createSaveToLocalStorageSystemActionView(saveViewFrame, saveToLocalStorage);
    dogbone.addChild(saveView);

    var x = startFrame.origin.x;
    var y = startFrame.bottom + (that.sysActionStartFrame.y * 2);
    var width = that.sysActionStartFrame.size.width;
    var height = that.sysActionStartFrame.size.height;
    var createValueFrame = Rectangle.create(x, y, width, height);
    var createValueView = createValueSystemActionView(createValueFrame, createValueAndAddToWorkshop);
    dogbone.addChild(createValueView);
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
    clonedView.name = "ClonedView." + that.workshopView.childCount;
    clonedView.backgroundColor = colorWithAlpha('#00c7c7', 0.7);

    that.workshopView.addChild(clonedView);
  }

  function createValueAndAddToWorkshop() {
    var origX = that.workshopView.frame.origin.x 
              + that.sysActionStartFrame.origin.x 
              + (that.workshopView.childCount * that.sysActionStartFrame.origin.x);
    var origY = that.workshopFrame.origin.y + that.sysActionStartFrame.origin.y;
    var offsetX = that.workshopView.childCount * that.sysActionStartFrame.size.width;
    var origin = Point.create(origX + offsetX, origY);
    var frame = Rectangle.createWithOriginAndSize(origin, that.sysActionStartFrame.size);

    var value = Value.create(0);
    var clonedView = ValueView.create(frame, value);
    clonedView.name = "ClonedView." + that.workshopView.childCount;
    clonedView.backgroundColor = colorWithAlpha('#ffcc66', 0.7);

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
