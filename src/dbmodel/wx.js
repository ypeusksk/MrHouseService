import fs from 'fs'
import axios from 'axios'
import consts from '../consts'

function getWX () {
  return new Promise((resolve, reject) => {
    fs.readFile('src/db/wx.json', (error, res) => {
      if (error) {
        reject(error)
      } else {
        const model = JSON.parse(res.toString())
        resolve(model)
      }
    })
  })
}

function setWX (model) {
  return new Promise((resolve, reject) => {
    fs.writeFile('src/db/wx.json', JSON.stringify(model), (error, res) => {
      error ? reject(error) : resolve()
    })
  })
}

// 从本地存储中获取一个旧的公众号access_token
function getOldGZHAccessToken () {
  return new Promise((resolve, reject) => {
    getWX().then(wx => {
      resolve(wx.GZHAccessToken)
    })
  })
}

function saveGZHAccessToken (accessToken) {
  return new Promise((resolve, reject) => {
    getWX().then(wx => {
      wx.GZHAccessToken = accessToken
      setWX(wx).then(() => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  })
}

// 获取一个新的公众号access_token
function getNewGZHAccessToken () {
  const { APPID, SECRET } = consts.WX_GZH_LOGIN
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`
  return axios.get(url).then(response => {
    return response.data.access_token
  })
}

// 获取素材列表
function getSucaiList (accessToken) {
  // body的格式具体要看公众号文档
  const body = {
    type: 'news',
    offset: 0,
    count: 5
  }
  const url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${accessToken}`
  return axios.post(url, body).then(response => {
    return response.data
  })
}

export default { getOldGZHAccessToken, saveGZHAccessToken, getNewGZHAccessToken, getSucaiList }
