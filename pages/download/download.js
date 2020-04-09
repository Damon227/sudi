//获取应用实例
const app = getApp()

Page({
  data: {
    code: ""
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  submit: function (e) {
    if (this.data.code != '147') {
      wx.showToast({
        title: '导出码错误',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '数据处理中...',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 3000)

    wx.cloud.init({
      env: 'ycm20200408-8nr0y'
    });
    const db = wx.cloud.database();

    db.collection('infos').get({
      success: function (res) {
        console.log(res)
        try {
          wx.cloud.callFunction({
            name: 'saveExcel',
            data: {
              infos: res.data
            },
            success: function (res) {

              wx.cloud.downloadFile({
                fileID: res.result.fileID, // 文件 ID
                success: res2 => {
                  // 返回临时文件路径
                  wx.getFileSystemManager().saveFile({
                    tempFilePath: res2.tempFilePath,
                    filePath: wx.env.USER_DATA_PATH + '/abcde.xlsx',
                    success: res3 => {
                      wx.hideLoading()
                      wx.openDocument({
                        filePath: res3.savedFilePath,
                      })
                    },
                    fail: error => {
                      wx.showToast({
                        title: '导出失败',
                        icon: 'none'
                      })
                    }
                  })
                },
                fail: error => {
                  wx.showToast({
                    title: '导出失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail: console.error
          })
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
})