const fs = require('fs')
const path = require('path')
const { ROOT } = require('../config')


function filterSnippets(model, { startDate, endDate, ...restOptions }) {
    const pattern = restOptions.description ? restOptions.description : '.*';
    return model.find({
        ...restOptions,
        createdDate: { $gte: startDate, $lte: endDate },
        description: { $regex: new RegExp(pattern, 'i') }
    },
        (err, snippets) => {
            if (err)
                console.log(err)
            return snippets
        })
}

function buildCodePreview(code) {
    const codeStrToArray = code.split('\n')
    const preiewArray = codeStrToArray.reduce((acc, str, i) => {
        i < 10 ? acc.push(str) : null
        return acc
    }, [])

    return preiewArray.join('\n')
}

function buildFile(filename, content) {
    const filePath = getSnippetPath(filename)
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err)
            console.log(err)
    })
}

function getSnippetPath(filename) {
    return path.join(ROOT, 'data', 'files', filename)
}

function deleteFile(filepath) {
    fs.unlink(filepath, (err) => {
        if (err) console.log(err)
    })
}


module.exports = {
    filterSnippets,
    buildCodePreview,
    buildFile,
    getSnippetPath,
    deleteFile
}

