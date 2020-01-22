const router = require('express').Router()
const snippetHelper = require('../helpers/snippetHelper')
const filterHelper = require('../helpers/filterHelper')
const Snippet = require('../db/models/snippet')


router.get('/snippets', async (req, res) => {
    const filter = filterHelper.prepareSnippet(req.query)
    snippetHelper.find(filter)
        .then((snippets) => res.send(snippets))
        .catch(err => res.sendStatus(500))

})

router.post('/snippets/create', async (req, res) => {
    const { userFilename, category, code, description } = req.body
    const snippet = await snippetHelper.create(userFilename, category, description, code)
    try {
        await snippet.save()
        const snippets = await Snippet.find({}).sort({ createdDate: -1 })
        res.status(201).send(snippets)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/snippets/:id', (req, res) => {
    snippetHelper.remove(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => res.sendStatus(500))
})

module.exports = router