const mongoose = require('mongoose')

const categoryScheme = new mongoose.Schema({
    id: Number,
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Category', categoryScheme)