import user from '../controller/user'
import BodyParser from 'body-parser'

function router (app) {
  app.all('*', (req, res, next) => {
    const { origin, Origin, referer, Referer } = req.headers
    const allowOrigin = origin || Origin || referer || Referer || '*'
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

  var urlencodedParser = BodyParser.urlencoded({ extended: false })
  app.post('/login', urlencodedParser, user.login)

  app.use('/test', function (req, res) {
    res.send('test')
  })
}

export default router
