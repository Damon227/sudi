//获取应用实例
const app = getApp()

Page({
  data: {
    region: ['上海市', '浦东新区', '城区'], //地区
    name: '', //总监昵称
    addressee: '',  //收件人
    phoneNo: '',  //电话
    address: '' //详细地址
  },
  onLoad: function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  addresseeInput: function (e) {
    this.setData({
      addressee: e.detail.value
    })
  },
  phoneNoInput: function (e) {
    this.setData({
      phoneNo: e.detail.value
    })
  },
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  submit: function (e) {
    //检查参数
    if (!this.data.name) {
      wx.showToast({
        title: '请输入总监昵称',
        icon: 'none'
      })
      return;
    }
    if (!this.data.addressee) {
      wx.showToast({
        title: '请输入收件人',
        icon: 'none'
      })
      return;
    }
    if (!this.data.phoneNo) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
      return;
    }
    if (!this.data.address) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return;
    }

    wx.cloud.init();
    const db = wx.cloud.database({ env: 'ycm20200408-8nr0y' });
    const infos = db.collection('infos');
    db.collection('infos').add({
      data: {
        name: this.data.name,
        addressee: this.data.addressee,
        phoneNo: this.data.phoneNo,
        region: this.data.region,
        address: this.data.address
      }
    })
  }
})