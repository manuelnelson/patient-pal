'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/users
    createCurriculum: {
        body: {
            name: _joi2.default.string().required(),
            //skills: Joi.array().required(),
            organization: _joi2.default.string().required()
        }
    }
};
//# sourceMappingURL=curriculum-validation.js.map