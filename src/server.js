const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { db } = require('./db/index')
const api = require('./routes')
require('dotenv').config()

global.ROOT_PATH = __dirname

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    )
    next()
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    next()
})

app.use('/api', api)

db.then(() => {
    app.listen(process.env.PORT, process.env.SERVER_HOST, err => {
        if (err) {
            console.log('Error: ' + err)
            return
        }

        console.log('Server started')
    })
})
