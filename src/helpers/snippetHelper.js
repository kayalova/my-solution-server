const path = require('path')
const mongoose = require('mongoose')
const { ROOT } = require('../config')
const Snippet = require('../db/models/snippet')
const fileHelper = require('../helpers/fileHelper')


const getPath = filename => path.join(ROOT, 'data', 'files', filename)

const getCodePreview = str => {
    let codePreviewStr = ''
    let start = 0
    let end = 0
    let linesCount = 0

    end = str.indexOf('\n', start)
    if (end === -1 && str.trim()) return str

    while (end !== -1 && linesCount < 10) {
        end = str.indexOf('\n', start)
        line = str.slice(start, end)
        codePreviewStr += `${line}\n`
        start = end + 1
        linesCount++
    }
    return codePreviewStr
}

const create = (originalFilename, category, description, code) => {
    const _id = new mongoose.Types.ObjectId()
    const filename = `${_id}-${originalFilename}`
    const createdDate = new Date().getTime()
    const codePreview = getCodePreview(code)
    const pathToFile = getPath(filename)

    return new Snippet({
        _id,
        filename,
        pathToFile,
        userFilename: originalFilename,
        description,
        codePreview,
        category,
        createdDate,
    })
}

const remove = id => {
    return Snippet.findByIdAndRemove({ _id: id }, (err, snippet) => {
        if (err) console.log(err)
        fileHelper.remove(snippet.pathToFile)
    })
}

const find = filterSnippet => {
    return new Promise((resolve, reject) => {
        Snippet.find(filterSnippet, (err, snippets) => {
            if (err) reject(err)
            else resolve(snippets)
        })
    })
}

const snippetHepler = {
    create,
    find,
    remove
}


module.exports = snippetHepler 