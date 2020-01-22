const descriptionFilter = filters => {
    if (filters.description) {
        filters.description = { $regex: new RegExp(filters.description) }
    }

    return filters
}

const datesFilter = filters => {
    if (filters.startDate) {
        filters.createdDate = { $gte: filters.startDate }
        delete filters.startDate
    }

    if (filters.endDate) {
        filters.createdDate = { ...filters.createdDate, $lte: filters.endDate }
        delete filters.endDate
    }

    return filters
}

//куда деть поля
// подумай тоже над названием метода (forSnippet, ...), прям режет глаз
const prepareSnippet = queries => {
    const snippetFilters = ["startDate", "endDate", "category", "filename", "description"]

    const selectors = snippetFilters.reduce((selectors, filter) => {
        if (filter in queries) selectors[filter] = queries[filter]
        return selectors
    }, {})

    datesFilter(selectors)
    descriptionFilter(selectors)

    return selectors
}

const filterHelper = {
    prepareSnippet
}

module.exports = filterHelper