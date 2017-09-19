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

var _controllers = require('../controllers');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// handlebars.registerHelper('dateFormat',function(date, format){
//     return moment(date).format(format);
// })
exports.default = function (req, res, next) {
    console.log(req.query);
    //for now, let's just get all skill data and show...eventually we'll hae to query this out
    var filePath = _path2.default.join(__dirname, '../views/report.html');
    var html = _fs2.default.readFileSync(filePath, 'utf8');
    var compiledTemplate = _handlebars2.default.compile(html);
    var columns = [{
        key: 'clientCurriculum.curriculum.name',
        heading: 'Curriculum'
    }, {
        key: 'skill.goalName',
        heading: 'Goal Name'
    }, {
        key: 'skill.targetName',
        heading: 'Target Name'
    }, {
        key: 'createdAt',
        heading: 'Date Mastered',
        isDate: true
    }, {
        key: 'skill.numberOfTrials',
        heading: 'Total Trials'
    }];
    var dateFormat = 'MMMM do, YYYY';
    var altDateFormat = 'MMMM DD, YYYY';

    _controllers.SkillDataCtrl.listReport(req, res, next).then(function (skillData) {
        var reportData = _lodash2.default.map(skillData, function (skillDatum) {
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
                    value = (0, _moment2.default)(value).format(altDateFormat);
                }
                dataObject.columns.push({
                    value: value
                });
            });
            return dataObject;
        });
        var startDate = req.query.startDate ? (0, _moment2.default)(new Date(req.query.startDate)).format(altDateFormat) : ' No Date Provided ';
        var endDate = req.query.endDate ? (0, _moment2.default)(new Date(req.query.endDate)).format(altDateFormat) : ' No Date Provided ';
        //timeout for data??
        var client = reportData && reportData.length > 0 ? reportData[0].skillData.clientCurriculum.client : null;
        //let student = reportData && reportData.length > 0 ? reportData[0].skillData.clientCurriculum.client.firstname + ' ' +  : 'No name provided';
        var data = {
            title: 'Targets mastered between ' + startDate + ' and ' + endDate,
            student: client ? client.firstname + ' ' + client.lastname : 'No Name Provided',
            data: reportData,
            headerCols: columns
        };
        var withData = compiledTemplate(data);
        var options = { format: 'Letter' };
        _htmlPdf2.default.create(withData, options).toBuffer(function (err, buffer) {
            if (err) return console.log(err);
            res.contentType("application/pdf");
            return res.end(buffer, 'binary');
            //console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    });

    //TODO: get the data
    // Render the view
    // return hbs.render('report').then((renderedTemplate)=>{

    //     let options = { format: 'Letter' };


    // });
};
//# sourceMappingURL=reports.js.map