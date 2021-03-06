'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;
/**
 * root level hooks
 */

after(function (done) {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  _mongoose2.default.models = {};
  _mongoose2.default.modelSchemas = {};
  _mongoose2.default.connection.close();
  done();
});

describe('## TargetType APIs', function () {
  var targetType = {
    name: 'test'
  };

  describe('# POST /api/targetTypes', function () {
    it('should create a new targetType', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/targetTypes').send(targetType).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(targetType.name);
        targetType = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/targetTypes', function () {
    it('should retrieve the targetType', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/targetTypes/' + targetType._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(targetType.name);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/targetTypes/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/targetTypes/:userId', function () {
    it('should update user details', function (done) {
      targetType.name = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/targetTypes/' + targetType._id).send(targetType).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/targetTypes/', function () {
    it('should search targetTypes and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/targetTypes?name=' + targetType.name).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/targetTypes', function () {
    it('should delete the targetType', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/targetTypes/' + targetType._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(targetType.name);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=target-type.test.js.map