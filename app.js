//Set up an Express.js server
require('dotenv').config()
const express = require('express')
const https = require('https')
const db = require(__dirname + '/queries')

const app = express()

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/homepage.html");
})

app.listen(3000, () => {
  console.log(`App running on port 3000.`)
})

app.get('/articles', db.getAllArticles)
app.get('/articles/:title', db.getArticleByTitle)
app.post('/articles', db.createArticle)
app.put('/articles/:title', db.updateArticle)
app.delete('/articles/:title', db.deleteArticle)
