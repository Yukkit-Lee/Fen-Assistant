// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {

    var endTime = new Date(event.endTime)
    var startTime = new Date(event.startTime)
    var drr = Math.abs(endTime.getTime() - startTime.getTime());
    var hours = (drr % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));

    return await db.collection("pointList").where(_.or([
        {
            endTime:endTime
        },
        {
            startTime:startTime
        }
      ]))
    .update({
            data: {
                duration: hours
            }
        })
}