const Category = require('../models/db/Category')

const getCategoryId = async _id => {
    const [cat] = await Category.find({ _id })
    return cat._id
}

const getCategories = async () => {
    return await Category.find({}).select('-__v ')
}

const categoryHelper = {
    getCategories,
    getCategoryId
}

module.exports = categoryHelper
