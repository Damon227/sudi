//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    region: ['上海市', '浦东新区', '城区'],
    name: '1',
    phoneNo: '2',
    address: '3'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goToAddAddress: function(e){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress'
    })
  },
  goTodownload: function(e){
    wx.navigateTo({
      url: '/pages/download/download',
    })
  }
})
