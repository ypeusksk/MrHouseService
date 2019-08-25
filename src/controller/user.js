import { user } from '../dbmodel'
import axios from 'axios'
import consts from '../consts'

function login (req, res) {
  const { username, password } = req.body
  user.checkUsernamePassword(username, password).then(() => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${consts.WX_LOGIN.APPID}&secret=${consts.WX_LOGIN.SECRET}`
    axios.get(url).then(response => {
      res.send(response.data)
    })
  }, () => {
    res.send('Invalid user or password')
  })
}

export default { login }
