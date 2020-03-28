const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    index:  celebrate({
            [Segments.QUERY] : Joi.object().keys({
                page: Joi.number(),
            }),
            }),
    create: celebrate({
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                value: Joi.number().required().min(1),
            }) ,
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required(),
            }).unknown(),
            }),
    delete: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            }) ,
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required(),
            }).unknown(),
            }),
}