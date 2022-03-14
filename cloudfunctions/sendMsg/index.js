const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
exports.main = async (event, context) => {
  try {

    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给那个用户
      page: 'pages/index/index', //要跳转到那个小程序页面
      data: {//推送的内容
        thing5: {
          value: event.title
        },
        date4: {
          value: event.time
        },
        thing2: {
          value: event.content
        },
        thing11: {
          value: event.notes
        }
      },
      templateId: 'hSw_8cf0gQGyPjWQ0i1qt3ZwgV4Df7wisphYclDFoDk' //模板id
    }).then(//发送完成后将该条记录isDone改为true 减少timer云函数循环次数
      db.collection("eventList").where({
        eventCreator: event.openid,
        eventTitle: event.title
      }).update({
        data: {
          isDone: true
        }
      })
    )
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}