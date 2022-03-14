// pages/dataPage/dataPage.js
var length = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        startTime: [],
        endTime: [],
        duration: [],
        done: [],
        length: 0,
        point: ""
    },

    //格式化时间
    dateFormat(fmt, date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒

        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    },

    //刷新总记录个数，渲染到前端数据
    getAllData() {
        wx.cloud.callFunction({
            name: "showLogs"
        }).then(res => {
            length = res.result.data.length;
            this.setData({
                length: res.result.data.length,
                dataList: res.result.data
            })
            console.log(length)
            this.judgeColor();

            // console.log(this.data.length)
            console.log("当前前端数据对象")
            console.log(this.data.dataList)
            // console.log(this.data.dataList[0].endTime)
            // var ooo=new Date(this.data.dataList[0].endTime)
            // console.log(this.dateFormat("YYYY-mm-dd HH:MM",ooo))
            this.setViewData();
        })
    },

    //格式化数据库数据
    setViewData() {
        //   console.log(this.data.dataList)
        var startTimeArray = [];
        var endTimeArray = [];
        var durationArray = [];
        var doneArr = [];
        var index = 0;
        var pointTotal = 22.752;
        for (var i = this.data.length - 1; i >= 0; i--) {

            var timeObj01 = new Date(this.data.dataList[i].startTime);
            var tempTime = new Date();
            var timeObj02 = new Date(this.data.dataList[i].endTime == undefined ? tempTime : this.data.dataList[i].endTime);
            var startTime = this.dateFormat("YYYY-mm-dd HH:MM", timeObj01);
            var endTime = this.dateFormat("YYYY-mm-dd HH:MM", timeObj02);
            var duration = this.data.dataList[i].duration == undefined ? 0 : this.data.dataList[i].duration.toFixed(2);
            var duration02 = this.data.dataList[i].duration == undefined ? 0 : this.data.dataList[i].duration;
            var done = this.data.dataList[i].done
            startTimeArray[index] = startTime;
            endTimeArray[index] = endTime;
            doneArr[index] = done;
            if (this.data.dataList[i].multiSpeed != undefined)
                pointTotal = pointTotal + (duration02 * 1.8);
            else
                pointTotal = pointTotal + duration02;
            durationArray[index++] = duration;
        }
        console.log(pointTotal)
        this.setData({
            startTime: startTimeArray,
            endTime: endTimeArray,
            duration: durationArray,
            done: doneArr,
            point: pointTotal.toFixed(2)
        })
    },

    //判断最新一条的进度颜色 完成蓝色 未完成白色
    judgeColor() {
        wx.cloud.callFunction({
            name: "isDone",
            data: {
                total: length
            }
        }).then(res => {
            return res.result.data[0].done
        })
    },

    // ppp(){
    //     wx.pageScrollTo({
    //         scrollTop: 0
    //       })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getAllData();

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
        var that = this
        setTimeout(function () {
            wx.showNavigationBarLoading() //在标题栏中显示加载
            that.judgeColor();
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