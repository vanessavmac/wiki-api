//Connect to database
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'wiki_db',
  password: 'password',
  port: 5432,
})

const getAllArticles = (req, res) => {
  pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getArticleByTitle = (req, res) => {
  const title = parseInt(req.params.title)

  pool.query('SELECT * FROM articles WHERE title = $1', [title], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createArticle = (req, res) => {
  const { title, content } = req.body

  pool.query('INSERT INTO articles (title,content) VALUES ($1, $2)', [title,content], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Article added.`)
  })
}

const updateArticle = (req, res) => {
  const title = req.params.title
  const content = req.body.content
  console.log(title)
  console.log(content)
  pool.query('UPDATE articles SET content = $1 WHERE title = $2',[content, title], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Article modified.`)
    }
  )
}

const deleteArticle = (req, res) => {
  const title = req.params.title
  pool.query('DELETE FROM articles WHERE title = $1', [title], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Article deleted with title: ${title}`)
  })
}

module.exports = {
  getAllArticles,
  getArticleByTitle,
  createArticle,
  updateArticle,
  deleteArticle,
}
