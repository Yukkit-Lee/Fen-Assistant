// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    // return event.currentTotal-1
    return await db.collection("pointList").skip(event.currentTotal-1).get()
}