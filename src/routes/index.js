const router = require('express').Router()
const snippetHelper = require('../helpers/snippetHelper')
const filterHelper = require('../helpers/filterHelper')
const errorHelper = require('../helpers/errorHelper')

router.get('/snippets', async (req, res) => {
    const filter = await filterHelper.prepareSnippet(req.query)
    snippetHelper.find(filter)
        .then((snippets) => res.send(snippets))
        .catch(err => res.status(500).json(errorHelper.getErrorResponse(err.message)))
})

router.post('/snippets/create', async (req, res) => {
    const { userFilename, category, code, description } = req.body
    const snippet = await snippetHelper.prepare(userFilename, category, description, code)
    snippetHelper.create(snippet, code)
        .then(() => res.sendStatus(201))
        .catch(err => res.status(500).json(errorHelper.getErrorResponse(err.message)))
})

router.delete('/snippets/:id', (req, res) => {
    snippetHelper.remove(req.params.id)
        .then((r) => { res.sendStatus(200); console.log(r) })
        .catch(err => res.status(500).json(errorHelper.getErrorResponse(err.message)))
})

module.exports = router