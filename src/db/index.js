require('dotenv').config()
const mongoose = require('mongoose')
const Category = require('../models/db/Category')

mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)

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
  }
  else {
    Category.insertMany([
      { id: 1, text: 'frontend' },
      { id: 2, text: 'backend' },
      { id: 3, text: 'machine-learning' },
      { id: 4, text: 'dependency-inversion' },
      { id: 5, text: 'computer-graphics' },
      { id: 6, text: 'algorithms' }
    ], ((error, cats) => {
      console.log('added categories...')
      console.log(cats)
    })
    )
  }
}

module.exports = { db }