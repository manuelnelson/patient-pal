import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  AWS_ACCESS_KEY_ID: Joi.string().required()
  .description('Amazon access key required for files'),
  AWS_SECRET_ACCESS_KEY: Joi.string().required()
  .description('Amazon secret key required for files'),
  MAILER_EMAIL_ID: Joi.string().required()
  .description('From email'),
  MAILER_PASSWORD: Joi.string().required()
  .description('From email password'),
  DOMAIN: Joi.string().required()
  .description('Environment domain'),
  // MONGO_HOST: Joi.string().required()
  //   .description('Mongo DB host url'),
  // MONGO_PORT: Joi.number()
  //   .default(27017)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
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

export default config;
