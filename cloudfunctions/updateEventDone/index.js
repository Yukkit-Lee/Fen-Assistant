
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();

 /*每天0:00更新数据isDone状态 */
exports.main = async (event, context) => {
   
    return await db.collection("eventList").where({}).update({
        data:{
          isDone:false
        }
      })
}