//定义db为晕数据库对象
// 1. 获取数据库引用
wx.cloud.init();
const db = wx.cloud.database();
var app = getApp()
const _ = db.command

Page({
  //获取填写内容
  getTextAreaContent: function (event) {
    this.data.number = event.detail.value;
    // console.log(this.data.number);
  },

  //submit发布
  formSubmit: function (e) {
    var that = this;
    var i, temp, count = 0;

    console.log('var count = ' + count);


    const db = wx.cloud.database();
    const Test = db.collection('counters');
    console.log('bill_code1数据为：', e.detail.value['input-bill_code1'])
    console.log('bill_code2数据为：', e.detail.value['input-bill_code2'])
    console.log('bill_code3数据为：', e.detail.value['input-bill_code3'])
    console.log('bill_code4数据为：', e.detail.value['input-bill_code4'])
    console.log('bill_code5数据为：', e.detail.value['input-bill_code5'])
    console.log('bill_code6数据为：', e.detail.value['input-bill_code6'])
    console.log('bill_code7数据为：', e.detail.value['input-bill_code7'])
    console.log('bill_code8数据为：', e.detail.value['input-bill_code8'])
    console.log('bill_code9数据为：', e.detail.value['input-bill_code9'])
    console.log('bill_code10数据为：', e.detail.value['input-bill_code10'])
    console.log('bill_code11数据为：', e.detail.value['input-bill_code11'])
    console.log('bill_code12数据为：', e.detail.value['input-bill_code12'])
    console.log('bill_code13数据为：', e.detail.value['input-bill_code13'])
    console.log('bill_code14数据为：', e.detail.value['input-bill_code14'])


    this.data.bill_code1 = e.detail.value['input-bill_code1']; 
    this.data.bill_code2 = e.detail.value['input-bill_code2']; 
    this.data.bill_code3 = e.detail.value['input-bill_code3']; 
    this.data.bill_code4 = e.detail.value['input-bill_code4']; 
    this.data.bill_code5 = e.detail.value['input-bill_code5']; 
    this.data.bill_code6 = e.detail.value['input-bill_code6']; 
    this.data.bill_code7 = e.detail.value['input-bill_code7']; 
    this.data.bill_code8 = e.detail.value['input-bill_code8']; 
    this.data.bill_code9 = e.detail.value['input-bill_code9']; 
    this.data.bill_code10 = e.detail.value['input-bill_code10']; 
    this.data.bill_code11 = e.detail.value['input-bill_code11']; 
    this.data.bill_code12 = e.detail.value['input-bill_code12']; 
    this.data.bill_code13 = e.detail.value['input-bill_code13']; 
    this.data.bill_code14 = e.detail.value['input-bill_code14']; 



    // 查询当前用户所有的 counters
    db.collection('counters').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          counters: res.data
        })
        // console.log('[数据库] [查询记录] 成功: ', res)
        console.log('counters.length:  ' + this.data.counters.length);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    if (this.data.bill_code1.trim() != '' && this.data.bill_code2.trim() != '' ) {

      //如果历史记录为0条
      if (this.data.counters.length == 0) {
        this.saveDataToServer();

      }


      //如果历史记录不为0条需要查重
      if (this.data.counters.length != 0) {

        for (i = 0; i < this.data.counters.length; i++) {
          //用来查重的字段
          if (this.data.bill_code2 == this.data.counters[i].bill_code2 || this.data.bill_code3 == this.data.counters[i].bill_code3) {
            count = 100;
            console.log("found same");
            console.log(that.data.bill_code2);
            console.log(this.data.counters[i].bill_code2);
            wx.showModal({
              title: '已经录入了',
              content: '重新提交/或检查发票号',
              showCancel: false,
            })
          }
        }
        if (count == 0) {
          this.saveDataToServer();
        }

      }
    } else {

      wx.showModal({
        title: '没有内容不能发布哦',
        content: '重新提交/或检查发票号',
        showCancel: false,
      })
    }

    //更新页面数据
    this.onLoad();
    count = 0;
  },


  //数据保存到集合
  saveDataToServer: function (event) {
    var that = this;
    const db = wx.cloud.database();
    const Test = db.collection('counters');

    db.collection('counters').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        bill_code1: that.data.bill_code1,
        bill_code2: that.data.bill_code2,
        bill_code3: that.data.bill_code3,
        bill_code4: that.data.bill_code4,
        bill_code5: that.data.bill_code5,
        bill_code6: that.data.bill_code6,
        bill_code7: that.data.bill_code7,
        bill_code8: that.data.bill_code8,
        bill_code9: that.data.bill_code9,
        bill_code10: that.data.bill_code10,
        bill_code11: that.data.bill_code11,
        bill_code12: that.data.bill_code12,
        bill_code13: that.data.bill_code13,
        bill_code14: that.data.bill_code14,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        // 清空，然后重定向到首页
        console.log("success---->" + res)

        // 清空数据
        that.data.bill_code1 = " ";
        that.data.bill_code2 = " ";
        that.data.bill_code3 = " ";
        that.data.bill_code4 = " ";
        that.data.bill_code5 = " ";
        that.data.bill_code6 = " ";
        that.data.bill_code7 = " ";
        that.data.bill_code8 = " ";
        that.data.bill_code9 = " ";
        that.data.bill_code10 = " ";
        that.data.bill_code11 = " ";
        that.data.bill_code12 = " ";
        that.data.bill_code13 = " ";
        that.data.bill_code14 = " ";

 

        that.setData({
          bill_code1: [],
          bill_code2: [],
          bill_code3: [],
          bill_code4: [],
          bill_code5: [],
          bill_code6: [],
          bill_code7: [],
          bill_code8: [],
          bill_code9: [],
          bill_code10: [],
          bill_code11: [],
          bill_code12: [],
          bill_code13: [],
          bill_code14: [],
        })
        that.showTipAndSwitchTab();
      },
      complete: function (res) {
        console.log("complete---->" + res)
      }
    })
  },

  /**
   * 数据添加成功提示
   */
  showTipAndSwitchTab: function (event) {
    wx.showToast({
      title: '发票记录添加成功',
    })
    console.log("============")
  },

  showTestNumber: function (event) {
    wx.navigateTo({
      url: '../handQuery/handQuery',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    counters: [], //发票数据组
    counterId: '',
    openid: '',
      bill_code1: '',
    bill_code2:'',
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
    number:'',
    requestResult: '',
  },


  onRemove: function (event) {
    // 查询当前用户所有的 counters
    db.collection('counters').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          counters: res.data
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

    console.log(this.data.counters[0])
    console.log('counters.length:  ' + this.data.counters.length);
    if (this.data.counters[this.data.counters.length - 1]._id) {

      const db = wx.cloud.database()
      db.collection('counters').doc(this.data.counters[this.data.counters.length - 1]._id).remove({
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
  },



  /**
   * 历史发票记录跳转
   */
  record: function () {
    wx.navigateTo({
      url: '../handQuery/handQuery'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    db.collection('counters').get({
      //如果查询成功的话    
      success: res => {
        console.log('counters ' + res.data)
        //这一步很重要，给counters赋值，没有这一步的话，前台就不会显示值
        this.setData({
          counters: res.data
        })
        console.log(' this.data.counters.length ' + this.data.counters.length);
      }
    })

  },
  back:function()
  {
    wx.navigateBack({
      changed: true
    }); //返回上一页 
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