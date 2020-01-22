const ResponseError = require('../models/common/ResponseError')

const getErrorResponse = msg => new ResponseError(msg)

const errorHelper = {
    getErrorResponse
}

module.exports = errorHelper
