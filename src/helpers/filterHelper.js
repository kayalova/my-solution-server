const Category = require('../models/db/Category')

const descriptionFilter = filters => {
    if (filters.description) {
        filters.description = { $regex: new RegExp(filters.description) }
    }

    return filters
}

const datesFilter = filters => {
    if (filters.startDate) {
        filters.createdAt = { $gte: filters.startDate }
        delete filters.startDate
    }

    if (filters.endDate) {
        filters.createdAt = { ...filters.createdAt, $lte: filters.endDate }
        delete filters.endDate
    }

    return filters
}

const categoryFilter = async filters => {
    if (filters.category) {
        const [cat] = await Category.find({ id: filters.category })
        filters.category = cat._id
    }

    return filters
}

//куда деть поля
// подумай тоже над названием метода (forSnippet, ...), прям режет глаз
const prepareSnippet = async queries => {
    const snippetFilters = ["startDate", "endDate", "category", "userFilename", "description"]

    const selectors = snippetFilters.reduce((selectors, filter) => {
        if (filter in queries) selectors[filter] = queries[filter]
        return selectors
    }, {})

    datesFilter(selectors)
    descriptionFilter(selectors)
    await categoryFilter(selectors)

    return selectors
}

const filterHelper = {
    prepareSnippet
}

module.exports = filterHelper