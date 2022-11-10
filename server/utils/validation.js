const joi = require('joi');

const name = data => {
    const schema = joi.object({
        name: joi.string().min(3).required()
    });

    return schema.validate(data);
};

const document = data => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        repository: joi.required()/*,
        fields: joi.required()*/
    });

    return schema.validate(data);
}

const update = data => {
    const schema = joi.object({
        id: joi.required(),
        fields: joi.required()
    });

    return schema.validate(data);
}

module.exports = { name, document, update };