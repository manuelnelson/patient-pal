'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

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

describe('## masteredSkill APIs', function () {
  var masteredSkill = {
    name: 'test'
  };

  describe('# POST /api/masteredSkills', function () {
    it('should create a new masteredSkill', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/masteredSkills').send(masteredSkill).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(masteredSkill.name);
        masteredSkill = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/masteredSkills', function () {
    it('should retrieve the masteredSkill', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/masteredSkills/' + masteredSkill._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(masteredSkill.name);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/masteredSkills/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/masteredSkills/:userId', function () {
    it('should update user details', function (done) {
      masteredSkill.name = 'bama';
      (0, _supertestAsPromised2.default)(_index2.default).put('/api/masteredSkills/' + masteredSkill._id).send(masteredSkill).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/masteredSkills/', function () {
    it('should search masteredSkills and return array', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/masteredSkills?name=' + masteredSkill.name).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/masteredSkills', function () {
    it('should delete the masteredSkill', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/masteredSkills/' + masteredSkill._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(masteredSkill.name);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=mastered-skill.test.js.map