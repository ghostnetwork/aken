var Rectangle = require('../../../../dogbone/geometry/rectangle.js');
var Point = require('../../../../dogbone/geometry/point.js');
var Size = require('../../../../dogbone/geometry/size.js');

(function() {
  'use strict';

  var kCoordX = 11
    , kCoordY = 22 
    , kWidth = 111
    , kHeight = 222
    , kOrigin = Point.create(kCoordX, kCoordY)
    , kSize = Size.create(kWidth, kHeight);
  
  GeometryFixtures.CoordX = kCoordX;
  GeometryFixtures.CoordY = kCoordY;
  GeometryFixtures.Width = kWidth;
  GeometryFixtures.Height = kHeight;
  GeometryFixtures.Origin = kOrigin.clone();
  GeometryFixtures.Size = kSize;
  GeometryFixtures.Point = Point.create(kCoordX, kCoordY);
  GeometryFixtures.Frame = Rectangle.createWithOriginAndSize(kOrigin, kSize);
  
  GeometryFixtures.RGBColorString = '#021560';
  GeometryFixtures.Alpha = 0.5;

  function GeometryFixtures(){};
  GeometryFixtures.create = function() {return new GeometryFixtures();};
  module.exports = GeometryFixtures;

}).call(this);
