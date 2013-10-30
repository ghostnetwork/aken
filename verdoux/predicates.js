console.log("predicates.js didLoad");

not = function(x) { return !x; };

existy = function (x) { return x != null; }; // Using != here to force conversion
notExisty = function (x) { return existy(x) === false; };
truthy = function (x) { return (x !== false) && existy(x); };
falsey = function (x) { return truthy(x) === false; };
fail = function(thing) { throw new Error(thing); };

makeOppositeOf = function(predicate) {
  return function() {
    return not(predicate.apply(null, _.toArray(arguments)));
  };
};

doWhenTruthy = function(condition, action) { return doWhen(truthy, condition, action); };
doWhenFalsey = function(condition, action) { return doWhen(falsey, condition, action); };
var doWhen = function(predicate, condition, action) {
  var result;
  if (predicate(condition))
    result = action();
  return result;
};

isEven = function (n) { return (n % 2) === 0; };
isOdd = makeOppositeOf(isEven);
