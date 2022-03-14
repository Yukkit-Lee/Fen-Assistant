// pages/inputPage/inputPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTimeText: "点击选择时间",
    },

    tips(){
        wx.showToast({
            title: '标题不可修改',
            icon: "none",
            duration: 1300
        })
    },

    getParamInfo(param){
        wx.cloud.callFunction({
            name:"getUpEvent",
            data:{
                title:param
            }
        }).then(res=>{
            this.setData({
                title:res.result.data[0].eventTitle,
                time:res.result.data[0].eventTime,
                notes:res.result.data[0].eventNote,
                content:res.result.data[0].eventContent
            })
        }
        )
    },

    requestSubMsg() {
        wx.requestSubscribeMessage({
          tmplIds: ['hSw_8cf0gQGyPjWQ0i1qt3ZwgV4Df7wisphYclDFoDk', 'AAEZs594629pOSr552Of3jxhDjTUKrwQsB9lXqM9vLU', '_fypHCKeQuF-LNJXHsIzHhe8Ka-LZCy4_qDlQhm1HuQ'],
          success(res) { console.log(res) }
        })
      },

    submit(e) {
        e.detail.value.timePicker=this.data.time
        var that=this
        // this.setTimeTodata()
        if (this.data.time == "")
            wx.showToast({
                title: '暂未添加时间',
                icon: "none",
                duration: 1600
            })
        else {
            var dataNote = e.detail.value.textArea == "" ? "" : e.detail.value.textArea
            console.log(dataNote)
            wx.cloud.callFunction({
                name: "updateEvent",
                data: {
                    searchTitle:e.detail.value.itemName,
                    content: e.detail.value.itemContent,
                    note: dataNote,
                    time: that.data.currentTimeText
                }
            }).then(
                wx.showToast({
                    title: '更新成功',
                    icon: 'success',
                    duration: 1600
                }).then(setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1000)
                )
            )
        }
        console.log(e)

    },

    setTimeTodata(e) {
        console.log(e)
        this.setData({
            currentTimeText: e.detail.value
        })
    },
    pickEvent(e) {
        console.log(e)
    },
    // check(){
    //     console.log("ASdasd")

    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.getParamInfo(options.title)
       this.setData({
        currentTimeText:options.time
       })
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