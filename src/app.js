import express from 'express'
// import conn from './db'

const app = express()

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers
  const allowOrigin = origin || Origin || referer || Referer || '*'
  console.log('allowOrigin: ' + allowOrigin)
  res.header('Access-Control-Allow-Origin', allowOrigin)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) // 可以带cookies
  res.header('X-Powered-By', 'Express')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('listen start')
  console.log('host', host)
  console.log('port', port)
})
