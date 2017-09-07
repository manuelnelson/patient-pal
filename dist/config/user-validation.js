'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/users
    createUser: {
        body: {
            username: _joi2.default.string().required(),
            email: _joi2.default.string().email().required()
        }
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            username: _joi2.default.string().required(),
            email: _joi2.default.string().email().required()
        },
        params: {
            userId: _joi2.default.string().hex().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            username: _joi2.default.string().required(),
            password: _joi2.default.string().required()
        }
    }
};
//# sourceMappingURL=user-validation.js.map