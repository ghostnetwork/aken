
function CentoView(frame) {
  var that = View.create(frame);

  that.isConnectable = function(){return false;};
  that.onWillRemove = function(){};

  (function(){
    PubSub.global.on(kDogboneWillRemoveChild, function(childView) {
      if (childView === that) {
        that.onWillRemove();
      }
    });
  }());

  return that;
}

CentoView.create = function(frame){return new CentoView(frame);};

if (typeof module !== 'undefined') {
  module.exports = CentoView;
  var util = require('util')
    , _ = require('underscore')
    , View = require('../../dogbone/views/view.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js');
}

CentoView.global = CentoView.create(Rectangle.Empty);
CentoView.Empty = CentoView.create(Rectangle.Empty);