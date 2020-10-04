const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 5001

const apiRoutes = require('./api-routes')
app.use(bodyParser.urlencoded({
    extended: true
})) 
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost/cs3219_taskb', { useNewUrlParser: true })
const db = mongoose.connection 
if (!db) {
    console.log('error connecting to db')
} else {
    console.log('connected successfully to db')
}

app.get('/', (req, res) => res.end('CS3219 OTOT Assignment Task B'))
app.use('/api/', apiRoutes)
app.listen(port, () => {
    console.log('Server running on port ' + port)
})