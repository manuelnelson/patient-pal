'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Roles = { Admin: 1, Professional: 2, Client: 10 };

var Constants = function Constants() {
    _classCallCheck(this, Constants);
};

;
Constants.roles = Roles;
Constants.defaultPassword = 'p@ssw0rd!';
Constants.reportTypes = { mastered: 'mastered', weakest: 'weakest', progress: 'progress' };
Constants.dateTypes = {
    dateFormat: 'MMMM do, YYYY',
    altDateFormat: 'MMMM DD, YYYY'
};
exports.default = Constants;
//# sourceMappingURL=constants.js.map