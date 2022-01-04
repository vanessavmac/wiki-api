//Set up an Express.js server
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require(__dirname + '/queries')

const app = express()
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/homepage.html");
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/articles', db.getAllArticles)
app.get('/articles/:title', db.getArticleByTitle)
app.post('/articles', db.createArticle)
app.put('/articles/:title', db.updateArticle)
app.delete('/articles/:title', db.deleteArticle)
