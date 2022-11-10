const joi = require('joi');

const name = data => {
    const schema = joi.object({
        name: joi.string().min(3).required()
    });

    return schema.validate(data);
};

module.exports = { name };