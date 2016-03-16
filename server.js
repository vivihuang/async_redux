var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')

var config = require('./webpack.config')
var BOOK_FILE = path.join(__dirname, 'book.json')
var FILM_FILE = path.join(__dirname, 'film.json')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-cache')
    next()
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/book', function(req, res) {
  fs.readFile(BOOK_FILE, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/book', function(req, res) {
  fs.readFile(BOOK_FILE, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    var bookList = JSON.parse(data)
    var lastId = bookList.data.children[bookList.data.children.length - 1].id
    var newBook = {
      id: lastId + 1,
      title: req.body.title
    }
    console.log(newBook)
    bookList.data.children.push(newBook)
    fs.writeFile(BOOK_FILE, JSON.stringify(bookList, null, 4), function(err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      res.json(bookList)
    })
  })
})

app.get('/api/film', function(req, res) {
  fs.readFile(FILM_FILE, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/film', function(req, res) {
  fs.readFile(FILM_FILE, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    var filmList = JSON.parse(data)
    var newFilm = {
      //id: Date.now(),
      //author: req.body.author,
      //text: req.body.text,
    }
    filmList.push(newFilm)
    fs.writeFile(FILM_FILE, JSON.stringify(filmList, null, 4), function(err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      res.json(filmList)
    })
  })
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
