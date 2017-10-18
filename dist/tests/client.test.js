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

describe('## Client APIs', function () {
  var client = {
    email: 'client@test.com',
    password: 'p@ssw0rd!',
    role: 10,
    firstname: 'test',
    lastname: 'beryy',
    organization: organization,
    status: 1
  };

  describe('# POST /api/clients', function () {
    it('should create a new client', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/clients').send(client).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.firstname).to.equal(client.firstname);
        client = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/clients', function () {
    it('should retrieve the client', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/clients/' + client._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.firstname).to.equal(client.firstname);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/clients/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/clients/:userId', function () {
    it('should update user details', function (done) {
      client.firstname = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/clients/' + client._id).send(client).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.firstname).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/clients/', function () {
    it('should search clients and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/clients?firstname=' + client.firstname).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/users', function () {
    it('should delete the client by deleting the user', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/users/' + client.userId).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(client.email);
        //expect(res.body.firstname).to.equal(professional.firstname);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=client.test.js.map