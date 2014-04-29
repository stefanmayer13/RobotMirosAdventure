'use strict';

var assert = require('assert'),
  sinon = require('sinon'),
  robotE = require('./../../game/robot');

describe('Robot', function() {
  beforeEach(function () {
    this.extension = {
      sensors: {
        top: sinon.stub(),
        right: sinon.stub(),
        bottom: sinon.stub(),
        left: sinon.stub()
      }
    };
    this.robot = robotE.create(this.extension);
    this.extension.sensors.top.returns('empty');
    this.extension.sensors.right.returns('empty');
    this.extension.sensors.bottom.returns('empty');
    this.extension.sensors.left.returns('empty');
  });
  describe('getPos()', function() {
    it('Should return robots position', function(){
      this.robot.setPos([1, 2]);
      assert.deepEqual([1, 2], this.robot.getPos());
    });
  });
  describe('getState()', function() {
    it('Should return internal state', function(){
      this.robot.setState({
        pos: [1, 0],
        dir: 'left'
      });
      assert.deepEqual([1, 0], this.robot.getState().pos);
      assert.deepEqual('left', this.robot.getState().dir);
    });
  });
});