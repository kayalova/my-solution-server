const mongoose = require('mongoose')

const snippetScheme = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userFilename: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    codePreview: {
        type: String,
        required: true
    },
    pathToFile: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Snippet', snippetScheme)