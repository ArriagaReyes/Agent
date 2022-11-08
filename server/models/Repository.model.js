const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: String,
    documents: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }]
});

schema.set('toJSON', {
    transform: (doc, returned) => {
        returned.id = returned._id.toString();
        delete returned._id;
        delete returned.__v;
    }
});

module.exports = model('Repository', schema);