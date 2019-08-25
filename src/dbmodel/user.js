import conn from '../db'
import md5 from 'js-md5'

function checkUsernamePassword (username = '', password = '') {
  return new Promise((resolve, reject) => {
    conn((db, dbo) => {
      dbo.collection('user').findOne({ username, password: md5(password) }, '', (error, result) => {
        if (error) throw error
        db.close()
        result ? resolve() : reject(new Error())
      })
    })
  })
}

export default { checkUsernamePassword }
