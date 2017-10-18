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
// get organization to add as ID to professional
// before((done) => {
//     request(app)
//     .get('/api/organizations')
//     .expect(httpStatus.OK)
//     .then((res) => {
//         console.log(res.body);
//         organization = res.body._id;
//         done();
//     })

// })

after(function (done) {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  _mongoose2.default.models = {};
  _mongoose2.default.modelSchemas = {};
  _mongoose2.default.connection.close();
  done();
});

describe('## Professional APIs', function () {
  var professional = {
    email: 'test@test.com',
    password: 'p@ssw0rd!',
    role: 2,
    firstname: 'test',
    lastname: 'lastname',
    title: 'professional',
    organization: organization,
    status: 1
  };

  describe('# POST /api/professionals', function () {
    it('should create a new professional', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/professionals').send(professional).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(professional.email);
        (0, _chai.expect)(res.body.firstname).to.equal(professional.firstname);
        (0, _chai.expect)(res.body.userId).is.not.equal(null);
        professional = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/professionals', function () {
    it('should retrieve the professional', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/professionals/' + professional._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(professional.email);
        (0, _chai.expect)(res.body.firstname).to.equal(professional.firstname);
        (0, _chai.expect)(res.body.userId).is.not.equal(null);
        done();
      }).catch(done);
    });
    it('should return not found', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/professionals/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/professionals/:userId', function () {
    it('should update user details', function (done) {
      professional.firstname = 'bama';
      (0, _supertest2.default)(_index2.default).put('/api/professionals/' + professional._id).send(professional).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.firstname).to.equal('bama');
        done();
      }).catch(done);
    });
  });

  describe('# Get /api/professionals/', function () {
    it('should search professionals and return array', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/professionals?firstname=' + professional.firstname).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/users', function () {
    it('should delete the professional by deleting the user', function (done) {
      //console.log(professional.userId)
      (0, _supertest2.default)(_index2.default).delete('/api/users/' + professional.userId).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(professional.email);
        //expect(res.body.firstname).to.equal(professional.firstname);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=professional.test.js.map