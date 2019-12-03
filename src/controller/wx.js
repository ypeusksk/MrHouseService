import axios from 'axios'
import { wx } from '../dbmodel'

function call (req, res) {
  const { access_token: accessToken, env, name } = req.params
  const body = req.body
  const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${accessToken}&env=${env}&name=${name}`
  axios.post(url, body).then(response => {
    res.send(response.data)
  })
}

function getSucaiList (req, res) {
  wx.getOldGZHAccessToken().then(oldGZHAccessToken => {
    wx.getSucaiList(oldGZHAccessToken).then(data => {
      if (data.errcode) {
        wx.getNewGZHAccessToken().then(newGZHAccessToken => {
          wx.getSucaiList(newGZHAccessToken).then(data => {
            if (data.errcode) {
              res.send()
            } else {
              wx.saveGZHAccessToken(newGZHAccessToken)
              res.send(data)
            }
          })
        })
      } else {
        res.send(data)
      }
    })
  })
}

export default { call, getSucaiList }
