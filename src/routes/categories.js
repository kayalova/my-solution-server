const router = require('express').Router()
const categoryHelper = require('../helpers/categoryHelper')
const errorHelper = require('../helpers/errorHelper')

router.get('/categories', (req, res) => {
    categoryHelper
        .getCategories()
        .then(cats => res.send(cats))
        .catch(err =>
            res.status(500).json(errorHelper.getErrorResponse(err.message))
        )
})

module.exports = router
