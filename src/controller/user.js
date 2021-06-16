import { user } from '../dbmodel'
import axios from 'axios'
import consts from '../consts'

function login (req, res) {
  consts.LOG && console.log('login listent')
  const { username, password } = req.body
  user.checkUsernamePassword(username, password).then(() => {
    consts.LOG && console.log('用户密码正确，开始调用微信小程序的登录api')
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${consts.WX_LOGIN.APPID}&secret=${consts.WX_LOGIN.SECRET}`
    axios.get(url).then(response => {
      consts.LOG && console.log('login response', response)
      res.send(response.data)
    })
  }, () => {
    res.send({ errmsg: 'Invalid user or password' })
  })
}

export default { login }
