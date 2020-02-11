const router = require('express').Router()
const snippetHelper = require('../helpers/snippetHelper')
const errorHelper = require('../helpers/errorHelper')
const filterHelper = require('../helpers/filterHelper')
const fileHelper = require('../helpers/fileHelper')
const { RESPONSE } = require('../constants')

router.get('/snippets', async (req, res) => {
    const filter = await filterHelper.prepareSnippet(req.query)
    snippetHelper
        .find(filter)
        .then(snippets => res.send(snippets))
        .catch(err =>
            res.status(500).json(errorHelper.getErrorResponse(err.message))
        )
})

router.get('/snippets/:id', async (req, res) => {
    const [snippet] = await snippetHelper.find({ _id: req.params.id })
    fileHelper
        .getContent(snippet.pathToFile)
        .then(code => res.send({ code, snippet }))
        .catch(err =>
            res.status(500).json(errorHelper.getErrorResponse(err.message))
        )
})

router.post('/snippets/create', async (req, res) => {
    const { userFilename, category, code, description } = req.body
    const snippet = await snippetHelper.prepare(
        userFilename,
        category,
        description,
        code
    )
    snippetHelper
        .create(snippet, code)
        .then(() =>
            res.status(201).json({ message: RESPONSE.SUCCESSFULLY_CREATED })
        )
        .catch(err =>
            res.status(500).json(errorHelper.getErrorResponse(err.message))
        )
})

router.delete('/snippets/:id', (req, res) => {
    snippetHelper
        .remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: RESPONSE.SUCCESSFULLY_DELETED })
        })
        .catch(err =>
            res.status(500).json(errorHelper.getErrorResponse(err.message))
        )
})

module.exports = router
