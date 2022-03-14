// pages/daysPage/daysPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
        startTime:"",
        alreadyDays:0
    },

    refreshDays() {
        wx.cloud.callFunction({
            name: "getStartDay"
        }).then(res => {
            var tempTime = new Date(res.result.data[0].startTime)
            var startTime = tempTime.getFullYear() + "-" + (tempTime.getMonth() + 1) + "-" + tempTime.getDate()
            var curTime=new Date();
            console.log()
            console.log(startTime)
            this.setData({
                title: res.result.data[0].title,
                startTime: startTime,
                alreadyDays:new Date(curTime.getTime()-tempTime.getTime()).getDate()-1
            })
            console.log(res)
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.refreshDays()
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