const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },
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