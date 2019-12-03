      // pages/mainpage/mainpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 自动扫描
   */
  autoScanInput: function () {

    wx.scanCode({
      success: (res) => {
        console.log(res)
        if (res.errMsg == 'scanCode:ok') {
          console.log(res.result)
        } else {
          wx.showToast({
            title: '自动扫码失败',
            icon: 'fail',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  },
  tohandquery:function(event)
  {
    wx.navigateTo({
      url: '../index_invoice/index_invoice',
    })
  },
  tohandqueryrecord: function (event) {
    wx.navigateTo({
      url: '../handQuery/handQuery',
    })
  },
  toscanquery: function (event) {
    wx.navigateTo({
      url: '../scanSearch/scanSearch',
    })
  },
  toscanqueryrecord: function (event) {
    wx.navigateTo({
      url: '../scanQuery/scanQuery',
    })
  },

})