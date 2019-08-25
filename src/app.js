import express from 'express'
import router from './router'

const app = express()
router(app)

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('listen start')
  console.log('host', host)
  console.log('port', port)
})
