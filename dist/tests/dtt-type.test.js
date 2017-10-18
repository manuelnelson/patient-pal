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

describe('## DttType APIs', function () {
  var dttType = {
    name: 'test'
  };

  describe('# POST /api/dttTypes', function () {
    it('should create a new dttType', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/dttTypes').send(dttType).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(dttType.name);
        dttType = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/dttTypes', function () {
    it('should retrieve the dttType', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/dttTypes/' + dttType._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(dttType.name);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/dttTypes/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/dttTypes/:userId', function () {
    it('should update user details', function (done) {
      dttType.name = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/dttTypes/' + dttType._id).send(dttType).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/dttTypes/', function () {
    it('should search dttTypes and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/dttTypes?name=' + dttType.name).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/dttTypes', function () {
    it('should delete the dttType', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/dttTypes/' + dttType._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(dttType.name);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=dtt-type.test.js.map