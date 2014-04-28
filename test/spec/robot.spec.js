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
      },
      marker: {
        markTile: sinon.stub(),
        isTileMarked: sinon.stub()
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

describe('Solution', function() {
  beforeEach(function () {
    this.extension = {
      sensors: {
        top: sinon.stub(),
        right: sinon.stub(),
        bottom: sinon.stub(),
        left: sinon.stub()
      },
      marker: {
        markTile: sinon.stub(),
        isTileMarked: sinon.stub()
      }
    };
    this.robot = robotE.create(this.extension);
    this.extension.sensors.top.returns('empty');
    this.extension.sensors.right.returns('empty');
    this.extension.sensors.bottom.returns('empty');
    this.extension.sensors.left.returns('empty');
  });
  describe('nextStep()', function() {
    describe('Should turn left if possible', function() {
      beforeEach(function () {
        this.extension.sensors.top.returns('empty');
        this.extension.sensors.right.returns('empty');
        this.extension.sensors.bottom.returns('empty');
        this.extension.sensors.left.returns('empty');
      });
      it('top', function() {
        this.robot.setState({
          dir: 'top',
          pos: [1, 1]
        });

        this.robot.nextStep();

        assert.deepEqual([0, 1], this.robot.getState().pos);
        assert.deepEqual('left', this.robot.getState().dir);
      });
      it('left', function() {
        this.robot.setState({
          dir: 'left',
          pos: [1, 1]
        });

        this.robot.nextStep();

        assert.deepEqual([1, 2], this.robot.getState().pos);
        assert.deepEqual('bottom', this.robot.getState().dir);
      });
      it('bottom', function() {
        this.robot.setState({
          dir: 'bottom',
          pos: [1, 1]
        });

        this.robot.nextStep();

        assert.deepEqual([2, 1], this.robot.getState().pos);
        assert.deepEqual('right', this.robot.getState().dir);
      });
      it('right', function() {
        this.robot.setState({
          dir: 'right',
          pos: [1, 1]
        });

        this.robot.nextStep();

        assert.deepEqual([1, 0], this.robot.getState().pos);
        assert.deepEqual('top', this.robot.getState().dir);
      });
    });

    describe('Robot should move in the direction it faces', function() {
      beforeEach(function () {
        this.extension.sensors.top.returns('empty');
        this.extension.sensors.right.returns('empty');
        this.extension.sensors.bottom.returns('empty');
        this.extension.sensors.left.returns('empty');
      });
      it('left', function() {
        this.robot.setState({
          dir: 'left',
          pos: [1, 1]
        });
        this.extension.sensors.bottom.returns('wall');

        this.robot.nextStep();

        assert.deepEqual([0, 1], this.robot.getPos());
      });
      it('top', function() {
        this.robot.setState({
          dir: 'top',
          pos: [1, 1]
        });
        this.extension.sensors.left.returns('wall');

        this.robot.nextStep();

        assert.deepEqual([1, 0], this.robot.getPos());
      });
      it('right', function() {
        this.robot.setState({
          dir: 'right',
          pos: [1, 1]
        });
        this.extension.sensors.top.returns('wall');

        this.robot.nextStep();

        assert.deepEqual([2, 1], this.robot.getPos());
      });
      it('bottom', function() {
        this.robot.setState({
          dir: 'bottom',
          pos: [1, 1]
        });
        this.extension.sensors.right.returns('wall');

        this.robot.nextStep();

        assert.deepEqual([1, 2], this.robot.getPos());
      });
    });

    describe('Should not turn around if other possibilities exist', function() {
      beforeEach(function () {
        this.extension.sensors.top.returns('empty');
        this.extension.sensors.right.returns('empty');
        this.extension.sensors.bottom.returns('empty');
        this.extension.sensors.left.returns('empty');
      });
      it('left', function() {
        this.robot.setState({
          dir: 'left',
          pos: [1, 1]
        });
        this.extension.sensors.left.returns('wall');
        this.extension.sensors.top.returns('wall');
        this.extension.sensors.right.returns('empty');
        this.extension.sensors.bottom.returns('empty');

        this.robot.nextStep();

        assert.deepEqual([1, 2], this.robot.getPos());
      });
      it('top', function() {
        this.robot.setState({
          dir: 'top',
          pos: [1, 1]
        });
        this.extension.sensors.left.returns('wall');
        this.extension.sensors.top.returns('wall');
        this.extension.sensors.right.returns('empty');
        this.extension.sensors.bottom.returns('empty');

        this.robot.nextStep();

        assert.deepEqual([2, 1], this.robot.getPos());
      });
      it('right', function() {
        this.robot.setState({
          dir: 'right',
          pos: [1, 1]
        });
        this.extension.sensors.left.returns('empty');
        this.extension.sensors.top.returns('wall');
        this.extension.sensors.right.returns('wall');
        this.extension.sensors.bottom.returns('empty');

        this.robot.nextStep();

        assert.deepEqual([1, 2], this.robot.getPos());
      });
      it('bottom', function() {
        this.robot.setState({
          dir: 'bottom',
          pos: [1, 1]
        });
        this.extension.sensors.left.returns('empty');
        this.extension.sensors.top.returns('empty');
        this.extension.sensors.right.returns('wall');
        this.extension.sensors.bottom.returns('wall');

        this.robot.nextStep();

        assert.deepEqual([0, 1], this.robot.getPos());
      });
    });

    describe('Should mark visited intersections', function() {
      beforeEach(function () {
        this.extension.sensors.top.returns('empty');
        this.extension.sensors.right.returns('empty');
        this.extension.sensors.bottom.returns('empty');
        this.extension.sensors.left.returns('empty');
      });
      it('intersection from bottom left, right', function() {
        this.extension.sensors.top.returns('wall');

        this.robot.nextStep();

        assert.equal(true, this.extension.marker.markTile.calledOnce);
      });
      it('intersection from bottom top, right', function() {
        this.extension.sensors.left.returns('wall');

        this.robot.nextStep();

        assert.equal(true, this.extension.marker.markTile.calledOnce);
      });
    });
  });
});