const mongoose = require('mongoose');
let mongooseTypePhone = require('mongoose-type-phone');
require('mongoose-type-email');

const Schema = mongoose.Schema;

let contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    address: {
        type: String
    },
    firstnumber: {
        type: String,
        required: true
    },
    secondnumber: {
        type: String
    },
    thirdnumber: {
        type: String
    }
}, {
    collection: 'contacts'
})

module.exports = mongoose.model('Contact', contactSchema)
