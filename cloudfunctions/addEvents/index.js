// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    var openid=wxContext.OPENID
    return await db.collection("eventList").add({
        data:{
            title:event.title,
            time:new Date(),
            openId:openid,
            content:event.content,
            notice:event.notice
        }
    })
}