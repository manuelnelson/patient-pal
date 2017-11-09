'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _controllers = require('../controllers');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

var _reportHelper = require('../lib/reportHelper');

var _reportHelper2 = _interopRequireDefault(_reportHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
    switch (req.query.reportType) {
        case _constants2.default.reportTypes.mastered:
            delete req.query.reportType;
            return runMasteredReport(req, res, next);
            break;
        case _constants2.default.reportTypes.weakest:
            delete req.query.reportType;
            return runWeakestReport(req, res, next);
            break;
        case _constants2.default.reportTypes.progress:
            delete req.query.reportType;
            return runProgressReport(req, res, next);
            break;
    }

    function runMasteredReport(req, res, next) {
        //for now, let's just get all skill data and show...eventually we'll hae to query this out
        var columns = [{
            key: 'curriculum.name',
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
            key: 'started',
            heading: 'Date Opened',
            isDate: true
        }, {
            key: 'numberOfTrials',
            heading: 'Total Trials'
        }];

        _controllers.MasteredSkillCtrl.list(req, res, next).then(function (skillData) {
            var reportData = _reportHelper2.default.buildReportDataFromColumns(columns, skillData);
            console.log(reportData);
            var startDate = req.query.startDate ? (0, _moment2.default)(new Date(req.query.startDate)).format(_constants2.default.dateTypes.altDateFormat) : ' No Date Provided ';
            var endDate = req.query.endDate ? (0, _moment2.default)(new Date(req.query.endDate)).format(_constants2.default.dateTypes.altDateFormat) : ' No Date Provided ';
            //timeout for data??
            var client = reportData && reportData.length > 0 ? reportData[0].skillData.client : null;
            var data = {
                title: 'Targets mastered between ' + startDate + ' and ' + endDate,
                student: client ? client.firstname + ' ' + client.lastname : 'No Name Provided',
                data: reportData,
                headerCols: columns
            };
            _reportHelper2.default.generateReport('mastered-report', data, res);
        });
    }
    function runWeakestReport(req, res, next) {
        var columns = [{
            key: 'clientCurriculum.curriculum.name',
            heading: 'Curriculum'
        }, {
            key: 'skill.targetName',
            heading: 'Target Name'
        }, {
            key: 'createdAt',
            heading: 'Date Opened',
            isDate: true
        }, {
            key: 'numberOfTrials',
            heading: 'Total Trials'
        }, {
            key: 'percent',
            heading: 'Percentage'
        }];

        getIndependentId().then(function (independentId) {
            getDttTypeId().then(function (dttTypeId) {
                _controllers.SkillDataCtrl.listReport(req, res, next).then(function (skillData) {
                    //filter out skills that are dtt only
                    skillData = skillData.filter(function (x) {
                        return x.skill.targetType.toString() === dttTypeId.toString();
                    });
                    //group by skill and curriculum
                    var grouped = skillData.reduce(function (agg, curr) {
                        var name = curr.skill._id + '.' + curr.clientCurriculum.curriculum._id;agg[name] = agg[name] || [];agg[name].push(curr);return agg;
                    }, {});
                    var weakReportData = Object.keys(grouped).reduce(function (agg, y) {
                        var independentCount = grouped[y].filter(function (skillResult) {
                            return skillResult.stringData.toString() == independentId.toString();
                        });
                        return agg.concat({ columns: [{ value: grouped[y][0].clientCurriculum.curriculum.name }, { value: grouped[y][0].skill.targetName }, { value: (0, _moment2.default)(grouped[y][0].createdAt).format(_constants2.default.dateTypes.altDateFormat) }, { value: grouped[y].length }, { value: toPercent(independentCount.length / grouped[y].length) }] });
                    }, []);
                    //let reportData = reportHelper.buildReportDataFromColumns(columns,skillData);
                    var startDate = req.query.startDate ? (0, _moment2.default)(new Date(req.query.startDate)).format(_constants2.default.dateTypes.altDateFormat) : ' No Date Provided ';
                    var endDate = req.query.endDate ? (0, _moment2.default)(new Date(req.query.endDate)).format(_constants2.default.dateTypes.altDateFormat) : ' No Date Provided ';
                    //timeout for data??
                    var client = skillData && skillData.length > 0 ? skillData[0].clientCurriculum.client : null;
                    var data = {
                        title: 'Weakest Targets',
                        student: client ? client.firstname + ' ' + client.lastname : 'No Name Provided',
                        data: weakReportData,
                        headerCols: columns
                    };
                    _reportHelper2.default.generateReport('mastered-report', data, res);
                });
            });
        });
    }

    function runProgressReport(req, res, next) {}

    function getIndependentId() {
        return new Promise(function (resolve, reject) {
            _controllers.DttTypeCtrl.list({ query: { name: 'Independent' } }, res, next).then(function (dttTypes) {
                var independentId = '';
                if (dttTypes && dttTypes.length > 0) return resolve(dttTypes[0]._id);
            });
        });
    }
    function getDttTypeId() {
        return new Promise(function (resolve, reject) {
            _controllers.TargetTypeCtrl.list({ query: { name: 'DTT' } }, res, next).then(function (targetTypes) {
                var dttTypeId = '';
                if (targetTypes && targetTypes.length > 0) return resolve(targetTypes[0]._id);
            });
        });
    }
    function toPercent(number) {
        return number * 100 + '%';
    }
};
//# sourceMappingURL=reports.js.map