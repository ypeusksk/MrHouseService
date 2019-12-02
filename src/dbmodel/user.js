import fs from 'fs'
import md5 from 'js-md5'

function checkUsernamePassword (username = '', password = '') {
  return new Promise((resolve, reject) => {
    fs.readFile('src/db/user.json', (error, res) => {
      if (error) {
        reject(error)
      } else {
        const user = JSON.parse(res.toString())
        user.username === username && user.password === md5(password) ? resolve() : reject(new Error())
      }
    })
  })
}

export default { checkUsernamePassword }
