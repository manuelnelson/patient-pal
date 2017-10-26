'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _models = require('../models');

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _nodemailerExpressHandlebars = require('nodemailer-express-handlebars');

var _nodemailerExpressHandlebars2 = _interopRequireDefault(_nodemailerExpressHandlebars);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailPath = _path2.default.join(__dirname, '../views/emails');
var email = process.env.MAILER_EMAIL_ID || 'info.practicepal@gmail.com',
    pass = process.env.MAILER_PASSWORD || '*******';
var handlebarOptions = {
    viewEngine: 'handlebars',
    viewPath: emailPath,
    extName: '.hbs'
};
var smtpTransport = _nodemailer2.default.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
});
smtpTransport.use('compile', (0, _nodemailerExpressHandlebars2.default)(handlebarOptions));
/**
* Returns jwt token if valid username and password is provided
* @param req
* @param res
* @param next
* @returns {*} 
*/
function sendEmail(to, template, subject, context) {
    return new Promise(function (resolve, reject) {
        var data = {
            to: to,
            from: email,
            template: template,
            subject: subject,
            context: context
        };
        return smtpTransport.sendMail(data, function (err) {
            if (err) return reject(err);
            return resolve('Email sent sucessfully');
        });
    });
}
exports.default = { sendEmail: sendEmail };
//# sourceMappingURL=email-controller.js.map