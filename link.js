const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Link', linkSchema)