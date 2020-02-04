const Category = require('../models/db/Category')
const { SNIPPET_FILTERS } = require('../constants')

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
        const [cat] = await Category.find({ _id: filters.category })
        filters.category = cat._id
    }

    return filters
}

const prepareSnippet = async queries => {
    const selectors = SNIPPET_FILTERS.reduce((selectors, filter) => {
        if (queries[filter]) {
            selectors[filter] = queries[filter]
        }
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
