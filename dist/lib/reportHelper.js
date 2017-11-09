'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _htmlPdf = require('html-pdf');

var _htmlPdf2 = _interopRequireDefault(_htmlPdf);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateReport(reportName, data, res) {
    var filePath = _path2.default.join(__dirname, '../views/' + reportName + '.html');
    var html = _fs2.default.readFileSync(filePath, 'utf8');
    var compiledTemplate = _handlebars2.default.compile(html);

    var withData = compiledTemplate(data);
    var options = { format: 'Letter' };
    _htmlPdf2.default.create(withData, options).toBuffer(function (err, buffer) {
        if (err) return console.log(err);
        res.contentType("application/pdf");
        return res.end(buffer, 'binary');
        //console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}

function buildReportDataFromColumns(columns, skillData) {
    console.log(_constants2.default.dateTypes);
    return _lodash2.default.map(skillData, function (skillDatum) {
        var dataObject = {
            skillData: skillDatum,
            columns: []
        };

        _lodash2.default.each(columns, function (column) {
            var keys = column.key.split('.');
            var value = skillDatum;
            _lodash2.default.each(keys, function (key) {
                if (value) value = value[key];
            });
            if (column.isDate) {
                value = (0, _moment2.default)(value).format(_constants2.default.dateTypes.altDateFormat);
            }
            dataObject.columns.push({
                value: value
            });
        });
        return dataObject;
    });
}

exports.default = { generateReport: generateReport, buildReportDataFromColumns: buildReportDataFromColumns };
//# sourceMappingURL=reportHelper.js.map