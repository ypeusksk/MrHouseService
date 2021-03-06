import user from '../controller/user'
import wx from '../controller/wx'
import BodyParser from 'body-parser'
import consts from '../consts'

function router (app) {
  app.all('*', (req, res, next) => {
    consts.LOG && console.log('listent')
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

  const urlencodedParser = BodyParser.urlencoded({ extended: false })

  app.post('/login', urlencodedParser, user.login)
  app.post('/call/access_token/:access_token/env/:env/name/:name', urlencodedParser, wx.call)
}

export default router
