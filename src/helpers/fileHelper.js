const fs = require('fs')

const write = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, 'utf8', (err) => {
            if (err) reject(err)
            resolve('File successfully created')
        })
    })
}

const remove = path => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) reject(err)
            resolve('File successfully deleted')
        })

    })
}

const fileHelper = {
    write,
    remove
}

module.exports = fileHelper
