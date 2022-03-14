// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
//         event接受前端传来的数据
exports.main = async (event, context) => {
    let num=event.num;
       return await  db.collection("demoList").limit(num).get() 
    //     等待异步完成 即 等待 db.get()从数据库取到数据再return 
    //     无await则直接return后面数据 拿不到数据库信息 
}