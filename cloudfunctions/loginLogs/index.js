// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    var curTime=new Date();

    return await db.collection("loginList").add({
        data:{
            "设备机型":event.model,
            "系统信息":event.system,
            "性能等级":event.benchmarkLevel,
            "访问时间":curTime.getFullYear()+"年"+(curTime.getMonth()+1)+"月"+curTime.getDate()+"日"+"-"+(curTime.getHours()+8)+":"+curTime.getMinutes()+":"+curTime.getSeconds(),
            "openid":wxContext.OPENID
        }
    })

}