import fs from 'fs'
import md5 from 'js-md5'

function setUser (model) {
  return new Promise((resolve, reject) => {
    fs.writeFile('src/db/user.json', JSON.stringify(model), (error, res) => {
      error ? reject(error) : resolve()
    })
  })
}

function getUser () {
  return new Promise((resolve, reject) => {
    fs.readFile('src/db/user.json', (error, res) => {
      if (error) {
        reject(error)
      } else {
        const model = JSON.parse(res.toString())
        resolve(model)
      }
    })
  })
}

function checkUsernamePassword (username = '', password = '') {
  return new Promise((resolve, reject) => {
    getUser().then(user => {
      user.username === username && user.password === md5(password) ? resolve() : reject(new Error())
    })
  })
}

function updatePassword (password) {
  return new Promise((resolve, reject) => {
    getUser().then(user => {
      user.password = password
      setUser(user).then(() => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  })
}

export default { checkUsernamePassword, updatePassword }
