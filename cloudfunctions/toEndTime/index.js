// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {

    var currentTime = new Date()
    var startTime=new Date(event.startTime)
    var drr = Math.abs(currentTime.getTime() - startTime.getTime());
    var hours = (drr % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));

    return await db.collection("pointList").where({
        done:false,
        bootStatus:true
    }).update({
        data: {
            endTime: currentTime,
            duration:hours,
            done:true,
            bootStatus:false,
        }
    })
}