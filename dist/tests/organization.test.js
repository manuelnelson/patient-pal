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

describe('## Organization APIs', function () {
  var organization = {
    name: 'test'
  };

  describe('# POST /api/organizations', function () {
    it('should create a new organization', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/organizations').send(organization).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(organization.name);
        organization = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/organizations', function () {
    it('should retrieve the organization', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/organizations/' + organization._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(organization.name);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/organizations/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/organizations/:id', function () {
    it('should update user details', function (done) {
      organization.name = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/organizations/' + organization._id).send(organization).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/organizations/', function () {
    it('should search organizations and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/organizations?name=' + organization.name).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/organizations', function () {
    it('should delete the organization', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/organizations/' + organization._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(organization.name);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=organization.test.js.map