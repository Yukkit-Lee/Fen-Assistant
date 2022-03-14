// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
   
    await db.collection("eventList").where({
        isDone: false
    }).get().then(
        res => {
            console.log(res)
            // console.log(res.dasta.length)
            var targetHours = [];
            var targetMins = [];
            var notesArray=["今夜星光闪闪，爱你的心满满",
            "想做你跌落的春天，做你的多巴胺",
            "今夜没有星星，不如看我眼睛",
            "你只能私藏，不能共享",
            "今天也要心情好好地度过",
            "老来多健忘，唯不忘相思",
            "我一见你就笑",
            "即便前路混沌,同你走过,才算人间",
            "生活很苦还好你甜",
            "星河滚烫,你是人间理想",
            "我余光中只有你",
            "醒来觉得甚是爱你",
            "有生之年，同你共赴",
            "每天记得把口红还我一点",
            "两面桃花，各安天涯",
            "睡在山海间，住进你心里",
            "近朱者赤,近你者甜"
        ]
            for (var i = 0; i < res.data.length; i++) {
                targetHours[i] = res.data[i].eventTime.substring(0, 2)
                targetMins[i] = res.data[i].eventTime.substring(3, 5)
                var curTime = new Date();
                var curHour=curTime.getHours();
                // console.log(curTime)
                if(curTime.getHours()>=16)
                curHour-=16; //处理date对象时差问题 避免出现getHours()+8>=24的情况
                else
                curHour+=8;//(UTC+8) 情况下从早上八点开始正常 需加8小时
                // console.log(curTime.getHours())
                // console.log(curTime.getMinutes())
                var formatDate=curTime.getFullYear()+"年"+(curTime.getMonth()+1)+"月"+curTime.getDate()+"日"
                console.log("targetTime=" + targetHours[i] + ":" + targetMins[i]) 
                console.log(("curTime=" + (curHour) + ":" + curTime.getMinutes()))
                var note=res.data[i].eventNote==""?notesArray[Math.floor((Math.random()*16))]:res.data[i].eventNote;
                console.log(note)
                if ((curHour) == targetHours[i] && curTime.getMinutes() == targetMins[i]) {
                    cloud.callFunction({
                        name: "sendMsg",
                        data: {
                            openid: res.data[i].eventCreator,
                            title:res.data[i].eventTitle,
                            content:res.data[i].eventContent,
                            time:formatDate,
                            notes:note
                        }
                    }).then(res => {
                        console.log("发送单挑成功", res)
                    }).catch(res => {
                        console.log("发送单挑失败", res)
                    })
                }
                else {
                    console.log("非指定时间,不进行发送动作")
                }
            }
        }
    )


}