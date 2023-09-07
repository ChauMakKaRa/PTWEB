const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors()) 
app.use(express.json())

app.get('/', function (req, res) {
  res.json({message: " Welcome to contact book applications!!"})
})

module.exports = app;