import * as Joi from 'joi';
import * as path from 'path'

let url = path.resolve(process.cwd(), '.env')

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();



// define validation for all the env vars
const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string()
            .allow(['development', 'production', 'test', 'provision'])
            .default('development'),
        SERVER_PORT: Joi.number()
            .default(8080),
        MONGOOSE_DEBUG: Joi.boolean()
            .when('NODE_ENV', {
                is: Joi.string().equal('development'),
                then: Joi.boolean().default(true),
                otherwise: Joi.boolean().default(false)
            }),
        JWT_SECRET: Joi.string()
            .default('1111222233334444')
            .description('JWT Secret required to sign'),
        MONGODB_URI: Joi.string()
            .default('mongodb://localhost:27017/api-stub')
            .description('Mongo DB url')
        
    }).unknown()
    .required();

const {
    error,
    value: envVars
} = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export {}
