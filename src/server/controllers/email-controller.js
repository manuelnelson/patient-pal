import httpStatus from 'http-status';
import { User } from '../models';
import APIError from '../lib/APIError';
import config from '../config';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';


let emailPath = path.join(__dirname, '../views/emails');
let email = process.env.MAILER_EMAIL_ID || 'info.practicepal@gmail.com',
    pass = process.env.MAILER_PASSWORD || '*******'
let handlebarOptions = {
    viewEngine: 'handlebars',
    viewPath: emailPath,
    extName: '.hbs'
};
let smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
      user: email,
      pass: pass
    }
});
smtpTransport.use('compile', hbs(handlebarOptions));
/**
* Returns jwt token if valid username and password is provided
* @param req
* @param res
* @param next
* @returns {*} 
*/
function sendEmail(to, template, subject, context) {
    return new Promise((resolve, reject) => {
        let data = {
            to: to,
            from: email,
            template: template,
            subject: subject,
            context: context
          };
        return smtpTransport.sendMail(data, (err) => {
            if(err)
                return reject(err);
            return resolve('Email sent sucessfully');
        });    
    })
}
export default { sendEmail };
