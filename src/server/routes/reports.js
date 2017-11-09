import {SkillDataCtrl, MasteredSkillCtrl, TargetTypeCtrl, DttTypeCtrl} from '../controllers'
import _ from 'lodash';
import moment from 'moment';
import Constants from '../lib/constants';   
import reportHelper from '../lib/reportHelper';
import {groupBy} from 'lodash';


export default (req,res,next) => {
    switch(req.query.reportType){
        case Constants.reportTypes.mastered:
            delete req.query.reportType;
            return runMasteredReport(req, res, next);
            break;
        case Constants.reportTypes.weakest:
            delete req.query.reportType;
            return runWeakestReport(req, res, next);
            break;
        case Constants.reportTypes.progress:
            delete req.query.reportType;
            return runProgressReport(req, res, next);
            break;
    }
    
    

    function runMasteredReport(req, res, next){
        //for now, let's just get all skill data and show...eventually we'll hae to query this out
        let columns = [{
            key: 'curriculum.name',
            heading: 'Curriculum'
        },{
            key: 'skill.goalName',
            heading: 'Goal Name'        
        }, {
            key: 'skill.targetName',
            heading: 'Target Name'
        }, {
            key: 'createdAt',
            heading: 'Date Mastered',
            isDate: true
        },{
            key: 'started',
            heading: 'Date Opened',
            isDate: true
        }, {
            key: 'numberOfTrials',
            heading: 'Total Trials'
        }];
    

        MasteredSkillCtrl.list(req,res,next).then((skillData) => {
            let reportData = reportHelper.buildReportDataFromColumns(columns,skillData);
            console.log(reportData)
            let startDate = req.query.startDate ? moment(new Date(req.query.startDate)).format(Constants.dateTypes.altDateFormat) : ' No Date Provided '
            let endDate = req.query.endDate ? moment(new Date(req.query.endDate)).format(Constants.dateTypes.altDateFormat) : ' No Date Provided '
            //timeout for data??
            let client = reportData && reportData.length > 0 ? reportData[0].skillData.client : null;
            let data = {
                title: `Targets mastered between ${startDate} and ${endDate}`,
                student: client ? `${client.firstname} ${client.lastname}` : 'No Name Provided',
                data: reportData,
                headerCols: columns
            }           
            reportHelper.generateReport('mastered-report',data,res);
            
        })
   
    }
    function runWeakestReport(req, res, next){
        let columns = [{
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

        getIndependentId().then((independentId) => {
            getDttTypeId().then((dttTypeId) => {
                SkillDataCtrl.listReport(req,res,next).then((skillData) =>{
                    //filter out skills that are dtt only
                    skillData = skillData.filter(x=>x.skill.targetType.toString() === dttTypeId.toString());
                    //group by skill and curriculum
                    let grouped = skillData.reduce((agg, curr) => { let name = curr.skill._id + '.' + curr.clientCurriculum.curriculum._id; agg[name] = agg[name] || []; agg[name].push(curr); return agg; }, {})
                    let weakReportData = (Object.keys(grouped)).reduce((agg,y) => {
                        let independentCount = grouped[y].filter(skillResult => skillResult.stringData.toString() == independentId.toString());
                        return agg.concat({columns:[
                            {value:grouped[y][0].clientCurriculum.curriculum.name},
                            {value:grouped[y][0].skill.targetName},
                            {value:moment(grouped[y][0].createdAt).format(Constants.dateTypes.altDateFormat)},
                            {value:grouped[y].length},
                            {value:toPercent(independentCount.length / grouped[y].length)}
                        ]});
                    },[]);
                    //let reportData = reportHelper.buildReportDataFromColumns(columns,skillData);
                    let startDate = req.query.startDate ? moment(new Date(req.query.startDate)).format(Constants.dateTypes.altDateFormat) : ' No Date Provided '
                    let endDate = req.query.endDate ? moment(new Date(req.query.endDate)).format(Constants.dateTypes.altDateFormat) : ' No Date Provided '
                    //timeout for data??
                    let client = skillData && skillData.length > 0 ? skillData[0].clientCurriculum.client : null;
                    let data = {
                        title: `Weakest Targets`,
                        student: client ? `${client.firstname} ${client.lastname}` : 'No Name Provided',
                        data: weakReportData,
                        headerCols: columns
                    }           
                    reportHelper.generateReport('mastered-report',data,res);
                });
    
            })
        })
    
    }

    function runProgressReport(req, res, next){
        
    }

    function getIndependentId(){
        return new Promise((resolve,reject) => {
            DttTypeCtrl.list({query:{name: 'Independent'}},res,next).then((dttTypes) => {
                let independentId = ''
                if(dttTypes && dttTypes.length > 0)
                    return resolve(dttTypes[0]._id);
            });    
        })
    }
    function getDttTypeId(){
        return new Promise((resolve,reject) => {
            TargetTypeCtrl.list({query:{name: 'DTT'}},res,next).then((targetTypes) => {
                let dttTypeId = ''
                if(targetTypes && targetTypes.length > 0)
                    return resolve(targetTypes[0]._id);
            });    
        })
    }
    function toPercent(number){
        return number*100 + '%'
    }

}
