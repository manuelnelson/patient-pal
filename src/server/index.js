import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import path from 'path';
import helmet from 'helmet';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import config from './config';
import winstonInstance from './config/winston';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import APIError from './lib/APIError';

let app = express();

// connect to db
initializeDb( db => {

	//static files
	app.use(express.static(path.join(__dirname, 'public')));
	
	// logger
	if (config.env === 'development') {
		app.use(morgan('dev'));
	}

	// 3rd party middleware
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	//https://github.com/expressjs/compression
	app.use(compress());

	//https://github.com/helmetjs/helmet aka security add-on
	app.use(helmet());

	app.use(cors({
		exposedHeaders: config.corsHeaders
	}));

	// enable detailed API logging in dev env
	if (config.env === 'development') {
		expressWinston.requestWhitelist.push('body');
		expressWinston.responseWhitelist.push('body');
		app.use(expressWinston.logger({
			winstonInstance,
			meta: true, // optional: log meta data about request (defaults to true)
			msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
			colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
		}));
	}
	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));
	// api router
	app.use('/', express.static('/index.html'));

	// if error is not an instanceOf APIError, convert it.
	app.use((err, req, res, next) => {
		if (err instanceof expressValidation.ValidationError) {
			// validation error contains errors which is an array of error each containing message[]
			const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
			const error = new APIError(unifiedErrorMessage, err.status, true);
			return next(error);
		} else if (!(err instanceof APIError)) {
			const apiError = new APIError(err.message, err.status, err.isPublic);
			return next(apiError);
		}
		return next(err);
	});
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new APIError('API not found', httpStatus.NOT_FOUND);
		return next(err);
	});

	// log error in winston transports except when executing test suite
	if (config.env !== 'test') {
		app.use(expressWinston.errorLogger({
			winstonInstance
		}));
	}
	// error handler, send stacktrace only during development
	app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
		res.status(err.status).json({
			message: err.isPublic ? err.message : httpStatus[err.status],
			stack: config.env === 'development' ? err.stack : {}
		})
	);

	app.listen(process.env.PORT || config.port,()=>{
		console.log(`Started on port ${config.port}`);
	});

});

export default app;
