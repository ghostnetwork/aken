var Segment = require('../../../../../cento/kernel/geometry/segment.js');
var Connector = require('../../../../../cento/kernel/connector.js');
var Point = require('../../../../../dogbone/geometry/point.js');
var PF = require('../ports/portFixtures.js');

(function() {
  'use strict';

  var kStartX = 111
    , kStartY = 222
    , kEndX = 333
    , kEndY = 444;
  CentoGeometryFixtures.StartX = kStartX;
  CentoGeometryFixtures.StartY = kStartY;
  CentoGeometryFixtures.EndX = kEndX;
  CentoGeometryFixtures.EndY = kEndY;

  var kSegmentStartPoint = Point.create(kStartX, kStartY)
    , kSegmentEndPoint = Point.create(kEndX, kEndY)
    , kSegmentSpec = {
        "startPoint":kSegmentStartPoint,
        "endPoint":kSegmentEndPoint
      };
  CentoGeometryFixtures.SegmentStartPoint = kSegmentStartPoint.clone();
  CentoGeometryFixtures.SegmentEndPoint = kSegmentEndPoint.clone();
  CentoGeometryFixtures.SegmentSpec = kSegmentSpec;
  CentoGeometryFixtures.Segment = Segment.create(kSegmentSpec);


  var kConnectorSpec = {
    "startPort":PF.OutputPort,
    "endPort":PF.InputPort
  };
  CentoGeometryFixtures.Connector = Connector.create(kConnectorSpec);

  function CentoGeometryFixtures(){};
  CentoGeometryFixtures.create = function() {return new CentoGeometryFixtures();};
  module.exports = CentoGeometryFixtures;

}).call(this);
