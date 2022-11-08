const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: String,
    fields: {},
    repository: { type: Schema.Types.ObjectId, ref: 'Repository' }
});

schema.set('toJSON', {
    transform: (doc, returned) => {
        returned.id = returned._id.toString();
        delete returned._id;
        delete returned.__v;
    }
});

module.exports = model('Document', schema);