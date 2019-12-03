//定义db为晕数据库对象
// 1. 获取数据库引用
wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
const app = getApp();
Page({
  showTestNumber: function (event) {
    wx.navigateTo({
      url: '../scanQuery/scanQuery',
    })
  },
    back: function () {
    wx.navigateBack({
      changed: true
    }); //返回上一页 
  },
  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-12-15',
    scan: [], //发票数据组
    counterId: '',
    openid: '',
    bill_code1: '',
    bill_code2: '',
    bill_code3: '',
    bill_code4: '',
    bill_code5: '',
    bill_code6: '',
    bill_code7: '',
    bill_code8: '',
    bill_code9: '',
    bill_code10: '',
    bill_code11: '',
    bill_code12: '',
    bill_code13: '',
    bill_code14: '',
    bill_code15: '',
    bill_code16: '',
    bill_code17: '',
    bill_code18: '',
    bill_code19: '',
    bill_code20: '',
    Value1: '',
    Value2: '',
    Value3: '',
    Value4: '',
    Value5: '',
    Value6: '',
    Value7: '',
    Value8: '',
    Value9: '',
    Value10: '',
    Value11: '',
    Value12: '',
    Value13: '',
    Value14: '',
    Value15: '',
    Value16: '',
    Value17: '',
    Value18: '',
    Value19: '',
    Value20: '',
    number: '',
    requestResult: '',
    UpdateImage: "请上传照片", //前端上传图片文字数据
    ImageFileID: "", //图片文件FileID
    ImagetempFilePaths: "", //图片文件本地临时地址
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    //后面的业务代码大家自行发挥
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid,
        })
        var openid = this.data.openid
        console.log(openid)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取 openid 失败，请检查是否有部署 login 云函数',
        })
        console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
      }
    })

    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'lbc-r1n9w'
    })


    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('scan').get({
      //如果查询成功的话    
      success: res => {
        console.log('scan ' + res.data)
        //这一步很重要，给counters赋值，没有这一步的话，前台就不会显示值
        this.setData({
          scan: res.data
        })
        console.log(' this.data.scan.length ' + this.data.scan.length);
      }
    })

  },
  onRemove: function (event) {
    // 查询当前用户所有的 scan
    db.collection('scan').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          scan: res.data
        })
        // console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    console.log(this.data.scan[0])
    console.log('scan.length:  ' + this.data.scan.length);
    if (this.data.scan[this.data.scan.length - 1]._id) {

      const db = wx.cloud.database()
      db.collection('scan').doc(this.data.scan[this.data.scan.length - 1]._id).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            counterId: '',

          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
    })
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
    var that = this;
    that.setData({
      currentTab: 0 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
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