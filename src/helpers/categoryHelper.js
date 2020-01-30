const Category = require('../models/db/Category')

const getCategoryId = async id => {
    const [cat] = await Category.find({ id })
    return cat._id
}

const categoryHelper = {
    getCategoryId
}

module.exports = categoryHelper