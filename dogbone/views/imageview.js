function ImageView(frame, source) {
  var that = View.create(frame);
  
  Object.defineProperty(that, 'image', {get : function() {
    return _image;},enumerable : true
  });


  that.render = function(graphics) {
    if (canDisplay) {
      graphics.drawImage(that.image, frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
    }
  }

  function configureImage() {
    _image = new Image();
    that.image.src = source;
    that.image.onload = function() {
      canDisplay = true;
    }
  }

  configureImage();

  var canDisplay = false;
  var _image;
  return that;
}

ImageView.create = function(frame, source){return new ImageView(frame, source);};

if (typeof module !== 'undefined') {module.exports = ImageView;}
