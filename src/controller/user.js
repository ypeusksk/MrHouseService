import { user } from '../dbmodel'
import axios from 'axios'
import consts from '../consts'
import md5 from 'js-md5'

function login (req, res) {
  const { username, password } = req.body
  user.checkUsernamePassword(username, password).then(() => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${consts.WX_LOGIN.APPID}&secret=${consts.WX_LOGIN.SECRET}`
    axios.get(url).then(response => {
      res.send(response.data)
    })
  }, () => {
    res.send({ errmsg: 'Invalid user or password' })
  })
}

function updatePassword (req, res) {
  const { username, password, newPassword } = req.body
  user.checkUsernamePassword(username, password).then(() => {
    const md5NewPassword = md5(newPassword)
    user.updatePassword(md5NewPassword).then(() => {
      res.send({})
    }, error => {
      res.send({ errmsg: error })
    })
  }, () => {
    res.send({ errmsg: 'Invalid user or password' })
  })
}

export default { login, updatePassword }
