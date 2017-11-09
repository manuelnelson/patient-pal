import pdf from 'html-pdf';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import Constants from '../lib/constants';
import moment from 'moment';
import _ from 'lodash';

function generateReport(reportName,data,res){
    let filePath = path.join(__dirname, `../views/${reportName}.html`)
    let html = fs.readFileSync(filePath, 'utf8');
    let compiledTemplate = handlebars.compile(html);

    let withData = compiledTemplate(data);
    let options = { format: 'Letter' };
    pdf.create(withData, options).toBuffer((err, buffer) => {
        if (err) return console.log(err);
        res.contentType("application/pdf");
        return res.end(buffer,'binary')
        //console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}

function buildReportDataFromColumns(columns, skillData)
{
    console.log(Constants.dateTypes)
   return  _.map(skillData, (skillDatum) => {
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
                value = moment(value).format(Constants.dateTypes.altDateFormat);
            }
            dataObject.columns.push({
                value: value
            })
        })
        return dataObject;
    });
}

export default {generateReport, buildReportDataFromColumns};