//Connect to database
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

const fs = require('fs')

const getAllArticles = (req, res) => {
  pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }

    const content = JSON.stringify(results.rows);
    fs.writeFile(__dirname + '/public/query-result.json', content, err => {
      if (err) {
        console.error(err)
      } else {
        res.sendFile(__dirname + "/article-list.html")
      }
    })
  })
}

const getArticleByTitle = (req, res) => {
  const title = req.params.title
  pool.query('SELECT * FROM articles WHERE title = $1', [title], (error, results) => {
    if (error) {
      throw error
    }

    const content = JSON.stringify(results.rows);
    fs.writeFile(__dirname + '/public/query-result.json', content, err => {
      if (err) {
        console.error(err)
      } else {
        res.sendFile(__dirname + "/article-list.html")
      }
    })
  })
}

const createArticle = (req, res) => {
  const {
    title,
    content
  } = req.query

  pool.query('INSERT INTO articles (title,content) VALUES ($1, $2)', [title, content], (error, results) => {
    if (error) {
      throw error
    }

    pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }

      const content = JSON.stringify(results.rows);
      fs.writeFile(__dirname + '/public/query-result.json', content, err => {
        if (err) {
          console.error(err)
        } else {
          res.sendFile(__dirname + "/article-list.html")
        }
      })
    })
  })
}

const updateArticle = (req, res) => {
  const title = req.params.title
  const content = req.query.content
  pool.query('UPDATE articles SET content = $1 WHERE title = $2', [content, title], (error, results) => {
    if (error) {
      throw error
    }
    pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }

      const content = JSON.stringify(results.rows);
      fs.writeFile(__dirname + '/public/query-result.json', content, err => {
        if (err) {
          console.error(err)
        } else {
          res.sendFile(__dirname + "/article-list.html")
        }
      })
    })
  })
}

const deleteArticle = (req, res) => {
  const title = req.params.title
  console.log(req)
  pool.query('DELETE FROM articles WHERE title = $1', [title], (error, results) => {
    if (error) {
      throw error
    }
    pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }

      const content = JSON.stringify(results.rows);
      fs.writeFile(__dirname + '/public/query-result.json', content, err => {
        if (err) {
          console.error(err)
        } else {
          res.sendFile(__dirname + "/article-list.html")
        }
      })
    })
  })
}

module.exports = {
  getAllArticles,
  getArticleByTitle,
  createArticle,
  updateArticle,
  deleteArticle
}
