var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var _ = require('lodash')

var config = require('./webpack.config')

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

app.get('/test/*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/list', function(req, res) {
  var file_name = path.join(__dirname, req.query.type + '.json')
  fs.readFile(file_name, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/list', function(req, res) {
  var file_name = path.join(__dirname, req.query.type + '.json')
  fs.readFile(file_name, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    var dataList = JSON.parse(data)
    var lastId = dataList.data.children[dataList.data.children.length - 1].id
    var newItem = {
      id: lastId + 1,
      title: req.body.title
    }
    dataList.data.children.push(newItem)
    fs.writeFile(file_name, JSON.stringify(dataList, null, 4), function(err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      res.json(dataList)
    })
  })
})

app.delete('/api/list', function(req, res) {
  var file_name = path.join(__dirname, req.query.type + '.json')
  fs.readFile(file_name, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    var dataList = JSON.parse(data)
    var deletedId = req.body.id
    _.remove(dataList.data.children, function(item) {
      return item.id === deletedId
    })
    fs.writeFile(file_name, JSON.stringify(dataList, null, 4), function(err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      res.json(dataList)
    })
  })
})

app.put('/api/list', function(req, res) {
  var file_name = path.join(__dirname, req.query.type + '.json')
  fs.readFile(file_name, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    var dataList = JSON.parse(data)
    _.map(dataList.data.children, function(item) {
      if (item.id == req.body.id) {
        item.title = req.body.title
      }
      return item
    })
    fs.writeFile(file_name, JSON.stringify(dataList, null, 4), function(err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      res.json(dataList)
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
