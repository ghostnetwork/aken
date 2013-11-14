
function PortConnect() {
  var that = PubSub.create();
  
  that.beginConnecting = function(hitView) {
    _isConnecting = true;
    if (_.isFunction(hitView.portAtPoint)) {
      console.log(hitView.name + '.portAtPoint');
    }
  };

  that.endConnecting = function() {
    _isConnecting = false; 
  };

  Object.defineProperty(that, 'isConnecting', {get : function() {return _isConnecting;},enumerable : true});
  var _isConnecting = false;
  return that;
}

PortConnect.create = function(){return new PortConnect();};

if (typeof module !== 'undefined') {module.exports = PortConnect;}