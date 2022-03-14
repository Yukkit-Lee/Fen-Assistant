var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var demo = new QQMapWX({
  key: 'B25BZ-UMBW3-I6X3P-3JCNT-TT563-JWFEY'
});
const db = wx.cloud.database();
var count = 0;
var latitude = 0;
var longitude = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bootStatus: false,
    checked: false,
    address: "",
    openId: "",
    isAdmin: false
  },

  //开始计时:获取当前开始时间并上传至数据库
  getCurrentTime() {
    var userOpenId = this.data.openId;
    console.log(userOpenId)
    if (userOpenId != "o0lEG5GwESpwMo8dbB42fai_tyhc" && userOpenId != "o0lEG5LltFoRVdFwBWw6EUXDdxos") {
      wx.showToast({
        title: '暂无权限',
        icon: "none",
        duration: 1600
      })
    }
    else {
      wx.cloud.callFunction({
        name: "getTime",
        data: {
          latitude: latitude,
          longitude: longitude
        }
      }).then(res => {
        this.getCount();
        console.log(res)
      })
      // var drr = Math.abs(day1.getTime() - day2.getTime());
      // var hours = (drr % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      // console.log(hours)
      this.setData({
        bootStatus: true
      })
    }
  },


  //获取当前集合中总共有多少条信息
  getCount() {
    wx.cloud.callFunction({
      name: "getCount"
    }).then(res => {
      count = res.result.total;
      console.log("count=" + count)
    })

  },


  //获取当前最近一条时间戳的完成状态
  getCurrentStatus() {
    wx.cloud.callFunction({
      name: "isDone",
      data: {
        total: count
      }
    }).then(res => {
      // stauts=res.result.data[0].done
      // console.log(res.result.data[0].bootStatus)
      this.setData({
        bootStatus: res.result.data[0].bootStatus
      })
    })
  },

  //结束计时，并添加累计时长字段以及更新done
  getCurrentTimeToEnd() {
    var userOpenId = this.data.openId;
    if (userOpenId != "o0lEG5GwESpwMo8dbB42fai_tyhc" && userOpenId != "o0lEG5LltFoRVdFwBWw6EUXDdxos") {
      wx.showToast({
        title: '暂无权限',
        icon: "none",
        duration: 1600
      })
    }
    else {
      db.collection("pointList").where({
        done: false
      }).get()
        .then(res => {
          var newObj = res.data[0].startTime;
          wx.cloud.callFunction({
            name: "toEndTime",
            data: {
              startTime: newObj
            }
          })
          console.log(newObj)
        })
      wx.showToast({
        title: '已停止 辛苦了',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        bootStatus: false
      })
    }
  },

  // ooo() {
  //   var day1 = new Date("2022-02-28T14:10:45.956Z");
  //   var day3=new Date (day1.getTime())
  //   var day2 = new Date(2022, 2, 28, 21, 25, 40);
  //   console.log(day3)
  //   console.log(day2)
  //   var drr = Math.abs(day1.getTime() - day2.getTime());
  //   var hours = (drr % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
  //   console.log(hours)

  // },


  listenerSwitch(res) {
    console.log(res.detail.value)
    var beChecked = res.detail.value
    this.setData({
      checked: beChecked
    })

  },


  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      highAccuracyExpireTime: 3000,
      success(res) {
        console.log(res)
        latitude = res.latitude;
        longitude = res.longitude;
        const speed = res.speed
        const accuracy = res.accuracy
        // 调用接口转换成具体位置
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            var address = res.result.formatted_addresses.recommend;
            // var address="潞州区威远门南路(华南清真寺)"
            console.log(address);
            console.log(address.length)
            if (address.length > 15)
              address = address.substring(0, 13) + ".."
            that.setData({
              address: address
            })
          },
          fail: function (res) {
            console.log('fail', res);
          }
          // complete: function (res) {
          //   console.log(res);
          // }
        })
      }
    })
  },

  //更新最新一条的时间 （后台管理）
  updateDuration() {
    db.collection("pointList").skip(count - 1).get()
      .then(res => {
        console.log(res)
        var start = res.data[0].startTime;
        var end = res.data[0].endTime;
        wx.cloud.callFunction({
          name: "updateDuration",
          data: {
            startTime: start,
            endTime: end,
            count: count
          }
        }).then(
          wx.showToast({
            title: '后台刷新成功',
            icon: 'success',
            duration: 1600
          })
        )
      })
  },

  //添加多倍速（后台管理）
  addMulti() {
    db.collection("pointList").skip(count - 1).get()
      .then(res => {
        console.log(res)
        var start = res.data[0].startTime;
        wx.cloud.callFunction({
          name: "multiAdd",
          data: {
            startTime: start,
            count: count
          }
        }).then(
          wx.showToast({
            title: '已开启1.8x',
            icon: 'success',
            duration: 1600
          })
        )
      })
  },

  //获取用户openid
  getOpenid() {
    wx.cloud.callFunction({
      name: "getOpenId"
    }).then(res => {
      let openid = res.result.openid
      if (openid == "o0lEG5GwESpwMo8dbB42fai_tyhc")
        this.setData({
          openId: openid,
          isAdmin: true
        })
      else
        this.setData({
          openId: openid,
        })
      // console.log("openID=", openid)
      // this.sendMsgById(openid)
    }).catch(res => {
      console.log("获取openid失败", res)
    })
  },



  //返回上次学习时间
  getHours() {
    this.getCount();
    this.getCurrentStatus();
    //  console.log(this.getCurrentStatus()+"123123")
    //  console.log(count)
    console.log(this.data.bootStatus == true)
    count = (this.data.bootStatus == true) ? count - 1 : count;
    console.log("现如今" + count)
    wx.cloud.callFunction({
      name: "isDone",
      data: {
        total: count
      }
    }).then(res => {
      // stauts=res.result.data[0].done
      // console.log(res.result.data[0].bootStatus)
      // this.setData({
      //   bootStatus: res.result.data[0].bootStatus
      // })
      var studyTime = res.result.data[0].duration
      console.log(res)
      this.setData({
        studyTime: studyTime.toFixed(2)
      })
    })

  },
  //上传事件函数
  // uploadEvent(){
  //   wx.cloud.callFunction({
  //     name:"addEvents",
  //     data:{

  //     }

  //   })

  // },

  //跳转logs页面
  toLogsPage() {
    wx.showLoading({
      title: "卖力加载中"
    })

    setTimeout(function () {
      wx.hideLoading()
      wx.navigateTo({
        url: '../../pages/dataPage/dataPage',
      }).then(res => {
        console.log(res)
      })

    }, 400)

  },

  // requireStatus(){
  //   return this.data.bootStatus;
  // },
  // module.exports.myContent = myContent
  /**
   * 生命周期函数--监听页面加载
   */

  //访问日志记录
  getUserLogsInfo() {
    const deviceInfo = wx.getDeviceInfo()
    console.log(deviceInfo.benchmarkLevel)
    console.log(deviceInfo.model)
    console.log(deviceInfo.system)
    wx.cloud.callFunction({
      name: "loginLogs",
      data: {
        benchmarkLevel: deviceInfo.benchmarkLevel,
        model: deviceInfo.model,
        system: deviceInfo.system
      }
    }).then(res => {
      console.log("访问日志记录成功")
    })
  },


  onLoad: function (options) {
    this.getOpenid();
    this.getCount();
    // this.getCurrentStatus();
    this.getLocation();
    this.getUserLogsInfo();

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
    this.onPullDownRefresh();
    console.log("onshow执行")
    // this.funs();
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
      that.getCurrentStatus()
      that.getHours()
      that.getLocation()
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