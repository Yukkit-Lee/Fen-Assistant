// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {

    var startTime = new Date(event.startTime)
    return await db.collection("pointList").where(
        {
            startTime:startTime
        }
    )
    .update({
            data: {
                multiSpeed: true
            }
        })
}