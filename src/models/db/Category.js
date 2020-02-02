const mongoose = require('mongoose')

const categoryScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', categoryScheme)
