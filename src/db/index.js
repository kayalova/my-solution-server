const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost:27017/snippets',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)

const db = mongoose.connection

db.on('error', err => console.log(err))
db.on('open', () => {
  console.log('connected to database')
})

module.exports = { db }