'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/users
    createSkillData: {
        body: {
            skill: _joi2.default.string().required(),
            clientCurriculum: _joi2.default.string().required(),
            trialNumber: _joi2.default.number().required()
        }
    }
};
//# sourceMappingURL=skill-data-validation.js.map