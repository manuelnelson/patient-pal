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

describe('## SkillData APIs', function () {
  var skillData = {
    trialNumber: 2,
    skill: '59d7c865fe9206132c684c36',
    clientCurriculum: '59d7c865fe9206132c684c36'
  };

  describe('# POST /api/skillDatas', function () {
    it('should create a new skillData', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/skillDatas').send(skillData).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.trialNumber).to.equal(skillData.trialNumber);
        skillData = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/skillDatas', function () {
    it('should retrieve the skillData', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/skillDatas/' + skillData._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.trialNumber).to.equal(skillData.trialNumber);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/skillDatas/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/skillDatas/:userId', function () {
    it('should update user details', function (done) {
      skillData.trialNumber = 4;
      (0, _supertest2.default)(_index2.default).put('/api/skillDatas/' + skillData._id).send(skillData).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.trialNumber).to.equal(skillData.trialNumber);
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/skillDatas/', function () {
    it('should search skillDatas and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/skillDatas?name=' + skillData.trialNumber).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/skillDatas', function () {
    it('should delete the skillData', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/skillDatas/' + skillData._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.trialNumber).to.equal(skillData.trialNumber);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=skill-data.test.js.map