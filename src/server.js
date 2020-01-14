const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const api = require('./routes')
const { URL, PORT } = require('./config')

const app = express()
const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost:27017/snippets',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, URL, (err) => {
            if (err) {
                console.log('Error: ' + err)
                return
            }

            console.log('Server started')
        })
    })

const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.on('open', () => {
    console.log('connected to database')

})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next()
})

app.use('/api', api)