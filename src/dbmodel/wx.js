import fs from 'fs'
import axios from 'axios'
import consts from '../consts'

// 从本地存储中获取一个旧的公众号
function getOldGZHAccessToken () {
  return new Promise((resolve, reject) => {
    fs.readFile('src/db/wx.json', (error, res) => {
      if (error) {
        reject(error)
      } else {
        const wx = JSON.parse(res.toString())
        resolve(wx.GZHAccessToken)
      }
    })
  })
}

function saveGZHAccessToken (accessToken) {
  return new Promise((resolve, reject) => {
    fs.readFile('src/db/wx.json', (error, res) => {
      if (error) {
        reject(error)
      } else {
        const wx = JSON.parse(res.toString())
        wx.GZHAccessToken = accessToken
        fs.writeFile('src/db/wx.json', JSON.stringify(wx), (error, res) => {
          error ? reject(error) : resolve()
        })
      }
    })
  })
}

// 获取公众号的一个新的access_token
function getNewGZHAccessToken () {
  const { APPID, SECRET } = consts.WX_GZH_LOGIN
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`
  return axios.get(url).then(response => {
    return response.data.access_token
  })
}

function getSucaiList (accessToken) {
  // body的格式具体要看公众号文档
  const body = {
    type: 'news',
    offset: 0,
    count: 20
  }
  const url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${accessToken}`
  return axios.post(url, body).then(response => {
    console.log(response.data)
    return response.data
  }, error => {
    console.error('error', error)
  })
}

export default { getOldGZHAccessToken, saveGZHAccessToken, getNewGZHAccessToken, getSucaiList }
