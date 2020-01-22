const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { db } = require('./db/index')
const api = require('./routes')
const { URL, PORT } = require('./config')

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
    app.listen(PORT, URL, err => {
        if (err) {
            console.log('Error: ' + err)
            return
        }

        console.log('Server started')
    })
})
