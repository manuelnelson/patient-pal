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

describe('## Skill APIs', function () {
  var skill = {
    targetName: 'test',
    goalName: 'test',
    stimulus: 'test',
    numberOfTrials: 2,
    targetType: '59d7c865fe9206132c684c36',
    masteryType: 1,
    organization: '59d7c865fe9206132c684c36'
  };

  describe('# POST /api/skills', function () {
    it('should create a new skill', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/skills').send(skill).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.targetName).to.equal(skill.targetName);
        skill = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/skills', function () {
    it('should retrieve the skill', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/skills/' + skill._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.targetName).to.equal(skill.targetName);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/skills/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/skills/:userId', function () {
    it('should update user details', function (done) {
      skill.targetName = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/skills/' + skill._id).send(skill).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.targetName).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/skills/', function () {
    it('should search skills and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/skills?name=' + skill.targetName).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/skills', function () {
    it('should delete the skill', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/skills/' + skill._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.targetName).to.equal(skill.targetName);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=skill.test.js.map