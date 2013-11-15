var kSideViewsAlpha     = 0.8;
var kBrownViewBgColor   = '#633200';
var kGreenViewBgColor   = '#008141';
var kYellowViewBgColor  = '#FFCC66';

function Example001(mainView, canvasSize) {
  var that = {};

  function configureViews(mainView, canvasSize) {
    console.log('canvasSize: ' + canvasSize.debugString());

    configureSideViews();

    configureDraggableViews();
    configureDropTargets();
    configureFadeableView();
    configureImageView();
    configureSegmentView();
  }

  function configureSideViews() {
    configureBrownSideView();
    configureGreenSideView();
    configureYellowSideView();
  }

  function configureBrownSideView() {
    var frame = Rectangle.create(0, 0, canvasSize.width * 0.05, canvasSize.height);
    var view = View.create(frame);
    view.backgroundColor = colorWithAlpha(kBrownViewBgColor, kSideViewsAlpha);
    view.name = "BrownView";
    view.zOrder = ZORDER_TOP - 1000000;
    view.makeUndraggable();
    view.makeUnselectable();
    view.onTouch = function() {toggleToolViewOpenClose(view, canvasSize, 0, 0);}
    mainView.addChild(view);
  }

  function configureGreenSideView() {
    var frame = Rectangle.create(0, 50, canvasSize.width * 0.05, canvasSize.height);
    var view = View.create(frame);
    view.backgroundColor = colorWithAlpha(kGreenViewBgColor, kSideViewsAlpha);
    view.name = "Green.Side.View";
    view.zOrder = ZORDER_TOP - 2000000;
    view.makeUndraggable();
    view.makeUnselectable();
    view.onTouch = function() {toggleToolViewOpenClose(view, canvasSize, 0, 50);}
    mainView.addChild(view);
  }

  function configureYellowSideView() {
    var frame = Rectangle.create(0, 100, canvasSize.width * 0.05, canvasSize.height);
    var view = View.create(frame);
    view.backgroundColor = colorWithAlpha(kYellowViewBgColor, kSideViewsAlpha);
    view.name = "Yellow.Side.View";
    view.isOpened = false;
    view.zOrder = ZORDER_TOP - 3000000;
    view.makeUndraggable();
    view.makeUnselectable();
    view.onTouch = function() {toggleToolViewOpenClose(view, canvasSize, 0, 100);}
    mainView.addChild(view);
  }

  function configureDraggableViews() {
    var pad = 30;
    var x = 200;
    var y = 100;
    var frame;
    var draggableView;
    var colors = ['#ffffff','#aaaaaa','#555555'];
    var orders = [1001, 1000, 1002];

    for (var i = 0; i < 3; i++) {
      frame = Rectangle.create(x, y, 50, 50);
      draggableView = View.create(frame);
      draggableView.name = "Cento.draggableView." + i;
      draggableView.backgroundColor = colorWithAlpha(colors[i], 1.0);
      draggableView.zOrder = orders[i];

      mainView.addChild(draggableView);
      x += 20;
      y += 20;
    }
  }

  function configureDropTargets() {
    var w = 100;
    var h = 100;
    var centerPt = canvasSize.center;
    var x = centerPt.x - (w / 2);
    var y = 40;
    var frame = Rectangle.create(x, y, 100, 100);
    var dropTargetView = View.create(frame);
    dropTargetView.name = "Cento.DropTargetView.01";
    dropTargetView.backgroundColor = colorWithAlpha('#CCCCCC', 1.0);
    dropTargetView.highlightBgColor = colorWithAlpha('#FFCC66', 1.0); //c7c700
    dropTargetView.zOrder = 100;
    dropTargetView.willAcceptDrop = acceptsDrop;

    mainView.dragdrop.registerDropTarget(dropTargetView);
    mainView.addChild(dropTargetView);

    y = y + h + 10;
    frame = Rectangle.create(x, y, 100, 100);
    var dropTargetViewB = View.create(frame);
    dropTargetViewB.name = "Cento.DropTargetView.02";
    dropTargetViewB.zOrder = 200;
    dropTargetViewB.backgroundColor = colorWithAlpha('#433BCC', 1.0);
    dropTargetViewB.highlightBgColor = colorWithAlpha('#00FF80', 1.0);
    dropTargetViewB.willAcceptDrop = acceptsDrop;

    mainView.dragdrop.registerDropTarget(dropTargetViewB);
    mainView.addChild(dropTargetViewB);
  }

  function configureFadeableView() {
    var w = 200;
    var h = 200;
    var centerPt = canvasSize.center;
    var x = centerPt.x - (w / 2);
    var y = centerPt.y - (h / 2);
    var frame = Rectangle.create(x, y, w, h);
    var view = View.create(frame);
    view.name = 'Cento.fadeable.view';
    view.backgroundColor = colorWithAlpha('#004080', 0.7);
    view.makeUndraggable();;

    var isOpen = true;
    var origBgColor = view.backgroundColor;
    view.onTouch = function() {
      var fadeDuration = 500;
      if (!isOpen) {
        View.fadeIn(view, origBgColor, fadeDuration);
        isOpen = true;
      }
      else {
        var origFrame = view.frame.clone();
        var startPoint = view.frame.origin.clone();
        var destPoint = startPoint.clone();
        var maxX = view.frame.origin.x + (canvasSize.width - view.frame.size.width);
        destPoint.moveTo(maxX, view.frame.origin.y);
        View.animatedMoveTo(view, startPoint, destPoint, 1000);
        View.fadeOut(view, fadeDuration);
        isOpen = false;

        setTimeout(function() {
          View.animatedMoveTo(view, destPoint, startPoint, 1000);
          View.fadeIn(view, origBgColor, fadeDuration);
          isOpen = true;
        }, 1000);
      }
      
    }

    mainView.addChild(view);
  }

  function configureImageView() {
    var x = 125;
    var w = 238;
    var h = 163;
    var centerPt = canvasSize.center;
    var y = centerPt.y - (h / 2);
    var frame = Rectangle.create(x, y, w, h);
    var imageView = ImageView.create(frame, 'resources/images/darth-vader.png');
    imageView.name = 'Cento.image.view';
    mainView.addChild(imageView);
  }

  function configureSegmentView() {
    var spec = {
      "startPoint":Point.create(100, 100),
      "endPoint":Point.create(300, 300)
    };
    var segment = Segment.create(spec);
    var segmentView = SegmentView.create(segment);
    mainView.addChild(segmentView);
  }

  function toggleToolViewOpenClose(view, canvasSize, startX, startY) {
    if (view.isOpened) {
      closeView(view, canvasSize, startX, startY);
    } 
    else {
      openView(view, canvasSize, startX, startY);
    }
  }

  function openView(view, canvasSize, startX, startY) {
    var maxX = (canvasSize.width * 0.90) - startY;
    var newFrame = Rectangle.create(startX, startY, maxX, canvasSize.height);
    view.resizeFrame(newFrame);
    view.isOpened = true;
  }

  function closeView(view, canvasSize, startX, startY) {
    var newFrame = Rectangle.create(startX, startY, canvasSize.width * 0.05, canvasSize.height);
    view.resizeFrame(newFrame);
    view.isOpened = false;
  }

  configureViews(mainView, canvasSize);
  return that;
}

Example001.create = function(mainView, canvasSize){
  return new Example001(mainView, canvasSize);
};

if (typeof module !== 'undefined') {module.exports = Example001;}
