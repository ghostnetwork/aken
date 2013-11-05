var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var DragDrop = require('../../../dogbone/dragdrop.js');
require('../../../verdoux/predicates.js');

describe('DragDrop', function(){
  'use strict';

  var dragdrop;

  beforeEach(function() {dragdrop = DragDrop.create();});

  it('should be able to be created', function(){assert(existy(dragdrop));});
  
});
