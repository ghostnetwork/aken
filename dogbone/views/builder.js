function ViewBuilder(spec) {
  var that = {};
  
  return that;
}

ViewBuilder.create = function(spec){return new ViewBuilder(spec);};

if (typeof module !== 'undefined') {module.exports = ViewBuilder;}