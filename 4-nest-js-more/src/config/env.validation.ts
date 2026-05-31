

import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().port().default(8000),
    DATABASE_URL: Joi.string().required(),
    TYPEORM_SYNC: Joi.boolean().required().default(true),
    TYPEORM_AUTO_LOAD_ENTITIES: Joi.boolean().required().default(true),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
    JWT_AUDIENCE: Joi.string().required(),
    JWT_ISSUER: Joi.string().required(),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().port().required(),
})