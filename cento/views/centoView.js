
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

CentoView.createFromSpec = function(spec) {
  var frame = Rectangle.createFromSpec(spec.frame);
  var centoView = CentoView.create(frame);
  centoView.shapeFromSpec(spec);
  centoView.viewFromSpec(spec);
  return centoView;
};

CentoView.createFromJSON = function(centoViewJSON) {return CentoView.createFromSpec(JSON.parse(centoViewJSON));};

if (typeof module !== 'undefined') {
  module.exports = CentoView;
  var util = require('util')
    , _ = require('underscore')
    , View = require('../../dogbone/views/view.js')
    , Rectangle = require('../../dogbone/geometry/rectangle.js')
    , PubSub = require('../../verdoux/pubsub.js');
}

CentoView.global = CentoView.create(Rectangle.Empty);
CentoView.Empty = CentoView.create(Rectangle.Empty);