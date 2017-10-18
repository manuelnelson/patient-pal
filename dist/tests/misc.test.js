'use strict';

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

describe('## Misc', function () {
    // describe('# GET /api/health-check', () => {
    //     it('should return OK', (done) => {
    //         request(app)
    //         .get('/api/health-check')
    //         .expect(httpStatus.OK)
    //         .then((res) => {
    //             expect(res.text).to.equal('OK');
    //             done();
    //         })
    //         .catch(done);
    //     });
    // });

    describe('# GET /api/404', function () {
        it('should return 404 status', function (done) {
            (0, _supertest2.default)(_index2.default).get('/api/404').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
                (0, _chai.expect)(res.body.message).to.equal('Not Found');
                done();
            }).catch(done);
        });
    });

    describe('# Error Handling', function () {
        it('should handle mongoose CastError - Cast to ObjectId failed', function (done) {
            (0, _supertest2.default)(_index2.default).get('/api/users/56z787zzz67fc').expect(_httpStatus2.default.INTERNAL_SERVER_ERROR).then(function (res) {
                (0, _chai.expect)(res.body.message).to.equal('Internal Server Error');
                done();
            }).catch(done);
        });

        // it('should handle express validation error - username is required', (done) => {
        //     request(app)
        //     .post('/api/users')
        //     .send({
        //         mobileNumber: '1234567890'
        //     })
        //     .expect(httpStatus.BAD_REQUEST)
        //     .then((res) => {
        //         expect(res.body.message).to.equal('"username" is required');
        //         done();
        //     })
        //     .catch(done);
        // });
    });
});
//# sourceMappingURL=misc.test.js.map