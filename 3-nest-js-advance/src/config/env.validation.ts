

import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().port().default(8000),
    DATABASE_URL: Joi.string().required(),
    TYPEORM_SYNC: Joi.boolean().required().default(true),
    TYPEORM_AUTO_LOAD_ENTITIES: Joi.boolean().required().default(true),
    SECRET_KEY: Joi.string().required(),
})