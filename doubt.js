const mongoose = require('mongoose')

const doubtSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    askedBy: {
        type: String,
        required: true
    },
    answered: {
        type: Boolean,
        default: false
    }
})

module.exports = new mongoose.model('Doubt', doubtSchema)