const fs = require('fs').promises

const write = async (path, content) => {
    try {
        await fs.writeFile(path, content, 'utf8')
        return 'File successfully created'
    }
    catch (error) {
        throw new Error(error)
    }
}

const remove = async path => {
    try {
        await fs.unlink(path)
        return 'File successfully deleted'
    }
    catch (error) {
        throw new Error(error)
    }
}

const fileHelper = {
    write,
    remove
}

module.exports = fileHelper
