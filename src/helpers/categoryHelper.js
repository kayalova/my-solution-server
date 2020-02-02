const Category = require('../models/db/Category')

const getCategoryId = async _id => {
    const [cat] = await Category.find({ _id })
    return cat._id
}

const categoryHelper = {
    getCategoryId
}

module.exports = categoryHelper