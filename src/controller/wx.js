import axios from 'axios'

function call (req, res) {
  const { access_token: accessToken, env, name } = req.params
  const body = req.body
  const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${accessToken}&env=${env}&name=${name}`
  axios.post(url, body).then(response => {
    res.send(response.data)
  })
}

export default { call }
