'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/users
    createClientCurriculum: {
        body: {
            client: _joi2.default.string().required(),
            curriculum: _joi2.default.string().required(),
            appointment: _joi2.default.string().required()
        }
    }
};
//# sourceMappingURL=client-curriculum-validation.js.map