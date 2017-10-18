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
describe('## Appointment APIs', function () {
  var appointment = {
    startDate: '11/09/2017',
    endDate: '11/10/2017',
    location: 'home'
  };

  describe('# POST /api/appointments', function () {
    it('should create a new appointment', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/appointments').send(appointment).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(appointment.name);
        appointment = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/appointments', function () {
    it('should retrieve the appointment', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/appointments/' + appointment._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(appointment.name);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/appointments/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/appointments/:userId', function () {
    it('should update user details', function (done) {
      appointment.location = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/appointments/' + appointment._id).send(appointment).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.location).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/appointments/', function () {
    it('should search appointments and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/appointments?location=' + appointment.location).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/appointments', function () {
    it('should delete the appointment', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/appointments/' + appointment._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.location).to.equal(appointment.location);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=appointment.test.js.map