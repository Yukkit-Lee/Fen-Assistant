// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    return await db.collection("eventList").where({
        eventTitle:event.searchTitle
    }).update({
        data: {
            eventTitle: event.title,
            eventContent: event.content,
            eventNote: event.note,
            eventTime: event.time,
            eventCreator:wxContext.OPENID,
        }
    })

    // return {
    //     event,
    //  
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }
}