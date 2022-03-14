// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    // var ctime=event.currentTime
    // console.log(ctime)
    return await db.collection("pointList").add({
        data:{
            startTime:new Date(),
            location:new db.Geo.Point(event.longitude, event.latitude),
            done:false,
            bootStatus:true,
        }
    })
    // return event
}