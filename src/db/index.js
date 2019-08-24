import mongodb from 'mongodb'
import consts from '../const'
import insert from './insert'

function conn (callback) {
  mongodb.MongoClient.connect(consts.DB_URL, { useNewUrlParser: true }).then((db) => {
    const dbo = db.db(consts.DB_NAME)
    callback(db, dbo)
  }, error => {
    // TODO 错误处理
    console.log('error', error)
  })
}

insert(conn)

export default conn
