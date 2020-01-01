const router = require('express').Router()
const Snippet = require('../models/snippet')
const {
    filterSnippetsBySelectors,
    buildCodePreview,
    formatDate,
    buildFile } = require('../helpers')

router.post('/snippets', (req, res) => {

    const selectors = {}
    for (let [field, value] of Object.entries(req.body)) {
        if (value)
            selectors[field] = value
    }

    res.send(['hello again'])
    filterSnippetsBySelectors(selectors)
})


router.post('/snippets/create', async (req, res) => {
    const { filename: userFilename, category, code } = req.body
    const description = buildCodePreview(code)
    const date = formatDate()

    const filename = '1-App.js'
    //создать файл и поместить его в папку files 
    const f = buildFile(filename, code)


    //создание экземпляра модели сниппета
    const snippet = new Snippet({
        _id: new mongoose.Types.ObjectId(),
        file: `${_id}-${userFilename}`,
        pathToFile: '',
        userFilename,
        description,
        category,
        date,
    })

    // сохраняем экземпляр
    try {
        const newSnippet = await snippet.save()
        res.status(201).json(newSnippet)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

    //делаем редирект на /api/snippets
})


router.delete('/:id', (req, res) => {

})



module.exports = router