const fs = require('fs').promises

const write = async (path, content) => {
    try {
        await fs.writeFile(path, content, 'utf8')
    } catch (error) {
        throw new Error(error)
    }
}

const remove = async path => {
    try {
        await fs.unlink(path)
    } catch (error) {
        throw new Error(error)
    }
}

const getContent = async filename => {
    try {
        return await fs.readFile(filename, 'utf8')
    } catch (error) {
        throw new Error(error)
    }
}

const fileHelper = {
    getContent,
    write,
    remove
}

module.exports = fileHelper
