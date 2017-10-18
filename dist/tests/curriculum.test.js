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

var organization = '59ca7f03298d4e2f1c3db5ed';

after(function (done) {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  _mongoose2.default.models = {};
  _mongoose2.default.modelSchemas = {};
  _mongoose2.default.connection.close();
  done();
});

describe('## Curriculum APIs', function () {
  var curriculum = {
    name: 'test',
    skills: ['59ca7f03298d4e2f1c3db5ef', '59ca7f03298d4e2f1c3db5ea'],
    organization: organization
  };

  describe('# POST /api/curriculums', function () {
    it('should create a new curriculum', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/curriculums').send(curriculum).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(curriculum.name);
        curriculum = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/curriculums', function () {
    it('should retrieve the curriculum', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/curriculums/' + curriculum._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(curriculum.name);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/curriculums/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/curriculums/:userId', function () {
    it('should update user details', function (done) {
      curriculum.name = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/curriculums/' + curriculum._id).send(curriculum).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/curriculums/', function () {
    it('should search curriculums and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/curriculums?name=' + curriculum.name).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/curriculums', function () {
    it('should delete the curriculum', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/curriculums/' + curriculum._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(curriculum.name);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=curriculum.test.js.map