const admin = {
  username: 'mrhouseadmin',
  password: 'e10adc3949ba59abbe56e057f20f883e' // 123456
}
function startInsert (db, dbo) {
  dbo.collection('user').insertOne(admin, (err, res) => {
    if (err) throw err
    db.close()
  })
}
const callback = function (db, dbo) {
  dbo.collection('user').find().toArray((error, result) => {
    if (error) throw error
    result.length === 0 ? startInsert(db, dbo) : db.close()
  })
}
export default conn => {
  conn(callback)
}
