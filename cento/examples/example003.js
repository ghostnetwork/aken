
function Example003(spec) {
  var that = {};

  var canvasSize = spec.canvasSize
    , dogbone = spec.dogbone;

  dogbone.mainView.backgroundColor = colorWithAlpha('#1D1E1A', 1.0);
  dogbone.mainView.highlightBgColor = dogbone.mainView.backgroundColor;
  dogbone.selectionFrameColor = colorWithAlpha('#ffffff', 1.0);

  (function(){
    var frame = Rectangle.create(50, 50, 50, 50);
    var view = View.create(frame);
    view.name = 'Example003.View';
    view.backgroundColor = colorWithAlpha('#00c7c7', 0.7);
    view.makeUnselectable();
    dogbone.addChild(view);
    startProgramView = view;

    view.onTouch = function() {
      saveToLocalStorage(view);
    };
  })();

  function saveToLocalStorage(view) {
    var viewJSON = LocalStorage.getItem("view");
    if (existy(viewJSON)) {
      var viewTemplate = JSON.parse(viewJSON);
      var point = Point.create(viewTemplate.frame.origin.x, viewTemplate.frame.origin.y);
      point = Point.create(point.x + (60 * dogbone.mainView.childCount), point.y);

      var frame = Rectangle.createFromSpec(viewTemplate.frame);
      frame.moveToPoint(point);

      var clonedView = View.create(frame);
      clonedView.name = "ClonedView." + dogbone.mainView.childCount;
      clonedView.onTouch = view.onTouch;
      dogbone.addChild(clonedView);
    }
    else {
      var data = JSON.stringify(view);
      LocalStorage.setItem("view", data);
      console.log('LocalStorage: ' + inspect(LocalStorage));
    }
  }

  return that;
}

Example003.create = function(spec){return new Example003(spec);};

if (typeof module !== 'undefined') {module.exports = Example003;}
