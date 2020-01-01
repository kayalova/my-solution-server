const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./routes/index')
const Snippet = require('./models/snippet')
const port = 3002
const url = 'localhost'
const app = express()

mongoose.connect('mongodb://localhost:27017/snippets', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.on('open', () => console.log('connected to database'))


/* --------- test initial data ---------- */
const data = require('./data/index')
const first = new Snippet(data[0]).save()
const second = new Snippet(data[1]).save()



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())
app.use('/api', api)


app.listen(port, url, (err) => {
    if (err) {
        console.log('Error: ' + err)
        return
    }

    console.log('Server started')
})