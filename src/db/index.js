require('dotenv').config()
const mongoose = require('mongoose')
const Category = require('../models/db/Category')

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => console.log(err))
db.on('open', async () => {
  console.log('connected to database')
  initCategories()
})

const initCategories = async () => {
  const cats = await Category.find({})
  if (cats.length) {
    console.log(cats)
  } else {
    Category.insertMany(
      [
        { title: 'frontend' },
        { title: 'backend' },
        { title: 'machine-learning' },
        { title: 'dependency-inversion' },
        { title: 'computer-graphics' },
        { title: 'algorithms' }
      ],
      (error, cats) => {
        console.log('added categories...')
        console.log(cats)
      }
    )
  }
}

module.exports = { db }
