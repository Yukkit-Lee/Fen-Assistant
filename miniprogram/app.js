// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-1gbei9qk7777fe06',
        traceUser: true,
      });
    }

    this.globalData = {};
    this.importFonts();
  },

  //真机显示需开启global
  importFonts(){
    wx.loadFontFace({
      family: '腾讯W7',
      source: 'url("https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/TencentW7.ttf")',
      success: console.log,
      global:true
    }),
    wx.loadFontFace({
      family: '腾讯W3',
      source: 'url("https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/TencentW3.ttf")',
      success: console.log,
      global:true
    })
  },

});
