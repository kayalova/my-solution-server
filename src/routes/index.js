const router = require('express').Router()
const mongoose = require('mongoose')
const Snippet = require('../models/snippet')
const {
    filterSnippets,
    buildCodePreview,
    getSnippetPath,
    buildFile,
    deleteFile } = require('../helpers')


router.get('/snippets/search', async (req, res) => {
    const { filename: userFilename, ...filters } = req.query
    const selectors = {}
    for (let [field, value] of Object.entries({ userFilename, ...filters })) {
        if (value)
            selectors[field] = value
    }

    const snippets = await filterSnippets(Snippet, selectors)
    res.send(JSON.stringify(snippets))
})

router.post('/snippets/create', async (req, res) => {
    console.log(req.body)
    const { filename: userFilename, category, code, description } = req.body
    const codePreview = buildCodePreview(code)
    const createdDate = new Date().getTime()
    const _id = new mongoose.Types.ObjectId()
    const filename = `${_id}-${userFilename}`
    buildFile(filename, code)

    const snippet = new Snippet({
        _id,
        filename,
        pathToFile: getSnippetPath(filename),
        userFilename,
        description,
        codePreview,
        category,
        createdDate,
    })
    try {
        await snippet.save()
        Snippet.find({}).sort({ createdDate: 'desc' }).exec(function (err, snippets) {
            if (err) console.log(err)
            res.status(201).send(snippets)
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.delete('/snippets/:id', (req, res) => {
    Snippet.findByIdAndRemove({ _id: req.params.id }, (err, snippet) => {
        if (err) console.log(err)
        deleteFile(snippet.pathToFile)
        res.status(200)
    })
    console.log(req.params.id)
})


module.exports = router