
function Segment(spec) {
  var that = {
    get startPoint(){return _startPoint;},
    get endPoint(){return _endPoint;},
  };

  that.debugString = function() {
    var result = '';
    result += ('\n  startPoint: ' + that.startPoint.name);
    result += ('\n    endPoint: ' + that.endPoint.name);
    return result;
  }
  
  var _startPoint = Point.createFromSpec(spec.startPoint)
    , _endPoint = Point.createFromSpec(spec.endPoint);
  return that;
}

Segment.create = function(spec){return new Segment(spec);};

if (typeof module !== 'undefined') {module.exports = Segment;}
