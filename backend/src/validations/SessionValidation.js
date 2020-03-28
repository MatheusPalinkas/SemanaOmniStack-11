const { celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    create: celebrate({
                [Segments.BODY]: Joi.object().keys({
                    id: Joi.string().required().length(8),
                }),
            }),
}