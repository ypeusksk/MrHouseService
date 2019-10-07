import express from 'express'
import router from './router'
import BodyParser from 'body-parser'

const app = express()
const limit = '20mb'
app.use(BodyParser.urlencoded({ limit, extended: true }))
app.use(BodyParser.json({ limit }))
router(app)

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('listen start')
  console.log('host', host)
  console.log('port', port)
})
