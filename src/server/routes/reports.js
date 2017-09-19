import pdf from 'html-pdf';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {SkillDataCtrl} from '../controllers'
import _ from 'lodash';
import moment from 'moment';

// handlebars.registerHelper('dateFormat',function(date, format){
//     return moment(date).format(format);
// })
export default (req,res,next) => {
    console.log(req.query) 
    //for now, let's just get all skill data and show...eventually we'll hae to query this out
    let filePath = path.join(__dirname, '../views/report.html')
    let html = fs.readFileSync(filePath, 'utf8');
    let compiledTemplate = handlebars.compile(html);
    let columns = [{
        key: 'clientCurriculum.curriculum.name',
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
    }, {
        key: 'skill.numberOfTrials',
        heading: 'Total Trials'
    }];
    const dateFormat = 'MMMM do, YYYY';
    const altDateFormat = 'MMMM DD, YYYY';
    
    SkillDataCtrl.listReport(req,res,next).then((skillData) =>{
        let reportData = _.map(skillData, (skillDatum) => {
            let dataObject = {
                skillData: skillDatum,
                columns: []
            };

            _.each(columns, (column) =>{
                let keys = column.key.split('.');
                let value = skillDatum;
                _.each(keys, (key) => {
                    if(value)
                        value = value[key];
                })
                if(column.isDate){
                    value = moment(value).format(altDateFormat);
                }
                dataObject.columns.push({
                    value: value
                })
            })
            return dataObject;
        });
        let startDate = req.query.startDate ? moment(new Date(req.query.startDate)).format(altDateFormat) : ' No Date Provided '
        let endDate = req.query.endDate ? moment(new Date(req.query.endDate)).format(altDateFormat) : ' No Date Provided '
        //timeout for data??
        let client = reportData && reportData.length > 0 ? reportData[0].skillData.clientCurriculum.client : null;
        //let student = reportData && reportData.length > 0 ? reportData[0].skillData.clientCurriculum.client.firstname + ' ' +  : 'No name provided';
        let data = {
            title: `Targets mastered between ${startDate} and ${endDate}`,
            student: client ? client.firstname + ' ' + client.lastname : 'No Name Provided',
            data: reportData,
            headerCols: columns
        }
        let withData = compiledTemplate(data);
        let options = { format: 'Letter' };
        pdf.create(withData, options).toBuffer((err, buffer) => {
            if (err) return console.log(err);
            res.contentType("application/pdf");
            return res.end(buffer,'binary')
            //console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    
    
    })


    //TODO: get the data
    // Render the view
	// return hbs.render('report').then((renderedTemplate)=>{
        
    //     let options = { format: 'Letter' };
		

    // });
}