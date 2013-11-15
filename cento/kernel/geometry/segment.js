
function Segment(spec) {
  var that = {
    get startPoint(){return _startPoint;},
    get endPoint(){return _endPoint;},
  };
  
  var _startPoint = spec.startPoint
    , _endPoint = spec.endPoint;
  return that;
}

Segment.create = function(spec){return new Segment(spec);};

if (typeof module !== 'undefined') {module.exports = Segment;}
