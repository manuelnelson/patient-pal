'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
var envVarsSchema = _joi2.default.object({
  NODE_ENV: _joi2.default.string().allow(['development', 'production', 'test', 'provision']).default('development'),
  PORT: _joi2.default.number().default(3000),
  MONGOOSE_DEBUG: _joi2.default.boolean().when('NODE_ENV', {
    is: _joi2.default.string().equal('development'),
    then: _joi2.default.boolean().default(true),
    otherwise: _joi2.default.boolean().default(false)
  }),
  JWT_SECRET: _joi2.default.string().required().description('JWT Secret required to sign'),
  AWS_ACCESS_KEY_ID: _joi2.default.string().required().description('Amazon access key required for files'),
  AWS_SECRET_ACCESS_KEY: _joi2.default.string().required().description('Amazon secret key required for files'),
  MAILER_EMAIL_ID: _joi2.default.string().required().description('From email'),
  MAILER_PASSWORD: _joi2.default.string().required().description('From email password'),
  DOMAIN: _joi2.default.string().required().description('Environment domain')
  // MONGO_HOST: Joi.string().required()
  //   .description('Mongo DB host url'),
  // MONGO_PORT: Joi.number()
  //   .default(27017)
}).unknown().required();

var _Joi$validate = _joi2.default.validate(process.env, envVarsSchema),
    error = _Joi$validate.error,
    envVars = _Joi$validate.value;

if (error) {
  throw new Error('Config validation error: ' + error.message);
}

var config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  awsAcessKey: envVars.AWS_ACCESS_KEY_ID,
  awsSecret: envVars.AWS_SECRET_ACCESS_KEY,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT || 3000
  },
  bodyLimit: "100kb",
  corsHeaders: ["Link"],
  mailerEmailId: envVars.MAILER_EMAIL_ID,
  mailerPassword: envVars.MAILER_PASSWORD,
  domain: envVars.DOMAIN
};

exports.default = config;
//# sourceMappingURL=config.js.map