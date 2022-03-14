// pages/newIndex/newIndex.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var demo = new QQMapWX({
  key: 'B25BZ-UMBW3-I6X3P-3JCNT-TT563-JWFEY'
});
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: "",
    title: [],
    eventTime: [],
    length: 0,
    idArray: [],
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },



  getEvent() {
    wx.cloud.callFunction({
      name: "getEvents",
    }).then(res => {
      var titleList = [];
      var timeList = [];
      var idList = [];
      for (var i = 0; i < res.result.data.length; i++) {
        titleList[i] = res.result.data[i].eventTitle;
        timeList[i] = res.result.data[i].eventTime
        idList[i] = res.result.data[i].eventCreator
      }
      // console.log(titleList)
      this.setData({
        length: res.result.data.length,
        title: titleList,
        eventTime: timeList,
        idArray: idList
      })
      console.log(res)
    })

  },
  getImg() {
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN',
    })

  },

  //请求服务通知权限
  requestSubMsg() {

    wx.requestSubscribeMessage({
      tmplIds: ['hSw_8cf0gQGyPjWQ0i1qt3ZwgV4Df7wisphYclDFoDk', 'AAEZs594629pOSr552Of3jxhDjTUKrwQsB9lXqM9vLU', '_fypHCKeQuF-LNJXHsIzHhe8Ka-LZCy4_qDlQhm1HuQ'],
      success(res) { console.log(res) }
    })
  },

  //获取用户openid
  getOpenid() {
    var that = this
    wx.cloud.callFunction({
      name: "getOpenId"
    }).then(res => {
      // console.log(res)
      that.setData({
        openId: res.result.openid
      })
    }).catch(res => {
      console.log("获取openid失败", res)
    })
  },

  //通过openId发给指定用户服务通知
  sendMsgById(openid) {
    // db.collection("eventList").get().then(res=>{
    //   console.log
    // })
    wx.cloud.callFunction({
      name: "sendMsg",
      data: {
        openid: openid
      }
    }).then(res => {
      console.log("推送消息成功", res)
    }).catch(res => {
      console.log("推送消息失败", res)
    })
  },
  // getLocation() {
  //   var that = this;
  //   wx.getLocation({
  //     type: 'gcj02',
  //     isHighAccuracy: true,
  //     highAccuracyExpireTime: 3000,
  //     success(res) {
  //       console.log(res)
  //       var latitude = res.latitude;
  //       var longitude = res.longitude;
  //       const speed = res.speed
  //       const accuracy = res.accuracy
  //       // 调用接口转换成具体位置
  //       demo.reverseGeocoder({
  //         location: {
  //           latitude: latitude,
  //           longitude: longitude
  //         },
  //         success: function (res) {
  //           console.log(res)
  //           var address = res.result.formatted_addresses.recommend;
  //           // var address="潞州区威远门南路(华南清真寺)"
  //           console.log(address.length)
  //           // if(address.length>15)
  //           // address=address.substring(0,13)+".."
  //           console.log(address);
  //           that.setData({
  //             address: address + "---爱你李依嘉"
  //           })
  //         },
  //         fail: function (res) {
  //           console.log('fail', res);
  //         }
  //         // complete: function (res) {
  //         //   console.log(res);
  //         // }
  //       })
  //     }
  //   })
  // },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res)
      }
    })

    wx.cloud.callFunction({
      name: "getOpenId"
    }).then(res => {
      // console.log(res.result.openid)
      this.setData({
        openId: res.result.openid
      })
    })
    return this.data.openId
  },

  verify() {
    var userId = this.getUserProfile();
    console.log(userId)
    if (userId != "o0lEG5GwESpwMo8dbB42fai_tcc")
      wx.showToast({
        title: '暂无权限',
        icon: "error",
        duration: 1600
      })
    else {
      wx.navigateTo({
        url: '../../pages/dataPage/dataPage',
      })
    }
  },

  testTap() {

    db.collection("eventList").skip(3).get().then(
      res => {
        console.log(res)
        var targetHours = res.data[0].eventTime.substring(0, 2)
        var targetMins = res.data[0].eventTime.substring(3, 5)
        var curTime = new Date();
        console.log(targetHours + ":" + targetMins)
        console.log(curTime.getHours() + "=curTime.getHours()")
        console.log(curTime.getMinutes() + "=curTime.getMinutes()")
        if (curTime.getHours() == targetHours && curTime.getMinutes() == targetMins) {
          console.log("zhixing")
        }

      }
    )

  },

  //2022-3-12 21:48:08 已废弃
  addData() {
    db.collection("eventList").where({}).update({
      data: {
        isDone: false
      }
    })
      .then(res => { console.log(res) })
  },



  navTap() {
    var that = this
    wx.navigateTo({
      url: '../../pages/inputPage/inputPage',
    }).then(this.requestSubMsg())
    // this.getUserProfile();
  },

  getinfo() {
    this.getUserProfile();
  },


  actionSheet(e) {
    var that = this
    //将前端点击的第几条信息，传递到js中
    /**
     * @param num wxmlData [the index of the click data] 
     */
    var wxmlData = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      // alertText:"asdasd",
      // itemColor:"#2d3r3d",
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 1) //用户点击删除
        {
          if (that.data.idArray[wxmlData] != that.data.openId) {
            wx.showToast({
              title: '暂无权限',
              icon: "error",
              duration: 1300
            })
          }
          else {
            wx.showModal({
              title: '操作提示',
              content: '是否删除本条日程提醒',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.cloud.callFunction({
                    name: "removeEvent",
                    data: {
                      title: that.data.title[wxmlData]
                    }
                  }).then(
                    wx.showToast({
                      title: '加载中',
                      icon: 'loading',
                      duration: 350
                    }).then(that.onPullDownRefresh()//onPullDownRefresh重新渲染页面
                    )
                  )
                  setTimeout(function () {
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 1300
                    })
                  }, 400)
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
        else { //用户点击编辑(或其他)
          if (that.data.idArray[wxmlData] != that.data.openId) {
            wx.showToast({
              title: '暂无权限',
              icon: "error",
              duration: 1300
            })
          }
          else{
            wx.navigateTo({
              url: '../../pages/updatePage/updatePage?title='+that.data.title[wxmlData]+'&time='+that.data.eventTime[wxmlData],
            })
          }


          console.log('用户点击编辑')
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();
    this.getEvent();
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    setTimeout(function () {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      that.getEvent();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})