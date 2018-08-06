// pages/personal/personal.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    points:0,
    level:0,
    color0: "#40a7e7",
    bcolor0: "#d0d0d0",
    color1: "#666666",
    bcolor1: "#ffffff",
    color2: "#666666",
    bcolor2: "#ffffff",
    color3: "#666666",
    bcolor3: "#ffffff"
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        points: 502.0,
        level: 6,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          points: 502.0,
          level: 6,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            points: 502.0,
            level: 6,
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      points: 502.0,
      level: 6,
    })
  },
  click0: function(e){
    this.setData({
      color0: "#40a7e7",
      bcolor0: "#d0d0d0",
      color1: "#666666",
      bcolor1: "#ffffff",
      color2: "#666666",
      bcolor2: "#ffffff",
      color3: "#666666",
      bcolor3: "#ffffff"
    })
    wx.switchTab({
      url: '../weather/weather',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  click1: function (e) {
    this.setData({
      color0: "#666666",
      bcolor0: "#ffffff",
      color1: "#40a7e7",
      bcolor1: "#d0d0d0",
      color2: "#666666",
      bcolor2: "#ffffff",
      color3: "#666666",
      bcolor3: "#ffffff"
    })
  },
  click2: function (e) {
    this.setData({
      color0: "#666666",
      bcolor0: "#ffffff",
      color2: "#40a7e7",
      bcolor2: "#d0d0d0",
      color1: "#666666",
      bcolor1: "#ffffff",
      color3: "#666666",
      bcolor3: "#ffffff"
    })
  },
  click3: function (e) {
    this.setData({
      color0: "#666666",
      bcolor0: "#ffffff",
      color3: "#40a7e7",
      bcolor3: "#d0d0d0",
      color2: "#666666",
      bcolor2: "#ffffff",
      color1: "#666666",
      bcolor1: "#ffffff"
    })
  },
})
