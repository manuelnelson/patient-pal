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

describe('## ClientCurriculum APIs', function () {
  //tests require appointment, client, and professional, so query first

  var clientCurriculum = {};
  describe('# GET /api/appointment', function () {
    it('should get an appointment to create a client curriculum', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/appointments').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        var appt = res.body[0];
        clientCurriculum = {
          appointment: appt._id,
          client: appt.client._id
        };
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/curriculums', function () {
    it('should get a curriculum to create a client curriculum', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/curriculums').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        var curriculum = res.body[0];
        clientCurriculum.curriculum = curriculum._id;
        clientCurriculum.completed = false;
        done();
      }).catch(done);
    });
  });

  describe('# POST /api/clientcurriculums', function () {
    it('should create a new clientCurriculum', function (done) {
      console.log(clientCurriculum);
      (0, _supertest2.default)(_index2.default).post('/api/clientcurriculums').send(clientCurriculum).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.completed).to.equal(clientCurriculum.completed);
        clientCurriculum = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/clientcurriculums', function () {
    it('should retrieve the clientCurriculum', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/clientcurriculums/' + clientCurriculum._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.completed).to.equal(clientCurriculum.completed);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/clientcurriculums/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/clientcurriculums/:userId', function () {
    it('should update user details', function (done) {
      clientCurriculum.completed = true;
      (0, _supertest2.default)(_index2.default).put('/api/clientcurriculums/' + clientCurriculum._id).send(clientCurriculum).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.completed).to.equal(true);
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/clientcurriculums/', function () {
    it('should search clientcurriculums and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/clientcurriculums?completed=' + clientCurriculum.completed).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/clientcurriculums', function () {
    it('should delete the clientCurriculum', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/clientcurriculums/' + clientCurriculum._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.completed).to.equal(clientCurriculum.completed);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=client-curriculum.test.js.map