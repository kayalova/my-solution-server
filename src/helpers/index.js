const fs = require('fs')

function filterSnippetsBySelectors(data, selectorsHash) {
    const { startDate, endDate } = selectorsHash

    return data.filter(snippet => {
        let flag = false
        const visited = []
        for (const [field, snippetValue] of Object.entries(snippet)) {

            if (field === 'date') {
                flag = isDateBetween(snippetValue, startDate, endDate)
                visited.push(flag)
                continue
            }
            let selectorValue = selectorsHash[field]
            if (selectorValue) {
                flag = selectorValue === snippetValue
                visited.push(flag)
            }
        }
        return visited.every(bool => bool)
    })
}

function isDateBetween(current, start, end) {
    // format : MM/dd/yyyy
    const currentDateArray = current.split('/') // [12, 06, 2019]
    const from = start.split('/') // [12, 01, 2019]
    const to = end.split('/') // [12, 15, 2019]

    return currentDateArray.every((el, i) => el >= from[i] && elem <= to[i])

}

function buildCodePreview(code) {
    const codeStrToArray = code.split('\n')
    const preiewArray = codeStrToArray.reduce((acc, str, i) => {
        i < 10 ? acc.push(str) : null
        return acc
    }, [])

    return preiewArray.join('\n')
}

function formatDate() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

function buildFile(filename, content) {
    const f = fs.writeFile(filename, content)
    //
}

module.exports = {
    filterSnippetsBySelectors,
    isDateBetween,
    buildCodePreview,
    formatDate,
    buildFile
}

