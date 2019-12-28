const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3002
const url = 'localhost'

const app = express()
app.use(bodyParser.json())
app.use(cors())


app.post('/api/snippets', (req, res) => {
    console.log(req.body)
    res.send(JSON.stringify([1, 1]))
})

app.listen(port, url, (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log('Server started')
})