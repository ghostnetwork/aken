function ProgramView(frame) {
  var that = View.create(frame);
  
  function configure() {
    var startViewFrame = Rectangle.create(
      that.frame.origin.x + 5, 
      that.frame.origin.y + 5, 20, 20);
    var startView = View.create(startViewFrame);
    startView.name = "ProgramView.StartView";
    startView.backgroundColor = colorWithAlpha('#00ff00', 0.5);
    that.addChild(startView);

    var endViewFrame = Rectangle.create(
      (that.frame.origin.x + that.frame.size.width) - 25,
      (that.frame.origin.y + that.frame.size.height) - 25, 20, 20);
    var endView = View.create(endViewFrame);
    endView.name = "ProgramView.EndView";
    endView.backgroundColor = colorWithAlpha('#ff0000', 0.5);
    that.addChild(endView);

    var x = that.frame.origin.x + 30;
    var y = that.frame.origin.y + (that.frame.size.height / 2) - 10;
    var width = that.frame.size.width - 60;
    var addActionViewFrame = Rectangle.create(x, y, width, 20);
    var addActionView = View.create(addActionViewFrame);
    addActionView.name = "ProgramView.AddActionView";
    addActionView.backgroundColor = colorWithAlpha('#c7c7c7', 0.5);
    that.addChild(addActionView);
  }
  configure();
  return that;
}

ProgramView.create = function(frame){return new ProgramView(frame);};

if (typeof module !== 'undefined') {
  module.exports = ProgramView;
  var util = require('util')
    , View = require('../dogbone/views/view.js');
}