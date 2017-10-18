'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/users
    createSkill: {
        body: {
            targetName: _joi2.default.string().required(),
            goalName: _joi2.default.string().required(),
            stimulus: _joi2.default.string().required(),
            numberOfTrials: _joi2.default.number().required(),
            targetType: _joi2.default.string().required(),
            masteryType: _joi2.default.number().required(),
            organization: _joi2.default.string().required()
        }
    }
};
//# sourceMappingURL=skill-validation.js.map