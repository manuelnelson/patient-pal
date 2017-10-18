'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/users
    createClient: {
        body: {
            firstname: _joi2.default.string().required(),
            lastname: _joi2.default.string().required(),
            email: _joi2.default.string().email().required(),
            organization: _joi2.default.string().required()
        }
    }
};
//# sourceMappingURL=client-validation.js.map