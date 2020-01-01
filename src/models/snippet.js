const mongoose = require('mongoose')
const snippetScheme = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userFilename: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        // default: Date.now ?
    },
    description: {
        type: String,
        required: true
    },
    pathToFile: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Snippet', snippetScheme)