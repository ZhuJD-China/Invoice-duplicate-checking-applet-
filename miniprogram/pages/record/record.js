//定义db为晕数据库对象
// 1. 获取数据库引用
const db = wx.cloud.database();
const _ = db.command;
Page({

  //获取填写内容
  getTextAreaContent: function (event) {
    this.data.number = event.detail.value;
    console.log(this.data.number);
  },

  getDBCount: function (event) {
    var that = this;
    const db = wx.cloud.database();
    const Test = db.collection('counters');
    db.collection('counters').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
      }
    })
  },



  //submit发布
  formSubmit: function (e) {
    var that = this;
    var i, temp, count = 0;
    var Num;

    const db = wx.cloud.database();
    const Test = db.collection('counters');

    console.log('number携带数据为：', e.detail.value['input-number'])
    console.log('bill_code携带数据为：', e.detail.value['input-bill_code'])
    console.log('bill_num携带数据为：', e.detail.value['input-bill_num'])
    console.log('amount，携带数据为：', e.detail.value['input-bill_amount'])
    console.log('bill_date携带数据为：', e.detail.value['input-bill_date'])

    console.log(this.data.ne[1].count);

    this.data.number = e.detail.value['input-number'];
    this.data.bill_code = e.detail.value['input-bill_code'];//发票代码
    this.data.bill_num = e.detail.value['input-bill_num'];//发票号码
    this.data.bill_amount = e.detail.value['input-amount'];//发票金额
    this.data.bill_date = e.detail.value['input-bill_date'];//开票日期

    db.collection('counters').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
      }
    })

    var Newcount = that.data.ne[0].count;

    if (this.data.number.trim() != '') {
      console.log(Newcount);
      for (i = 0; i < Newcount; i++) {
        temp = that.data.ne[i].number;
        if (this.data.number == temp) {
          console.log("counters");
          count++;
          console.log(that.data.number);
          console.log(temp);
          wx.showModal({
            title: '已经录入了',
            content: '重新提交/或检查发票号',
            showCancel: false,
          })
        }
        else {
          console.log("different");
          console.log(that.data.number);
          console.log(temp);
        }

      }

      if (count == 0) {
        this.saveDataToServer();
        this.onCounterInc();
      }
    } else {
      wx.showModal({
        title: '没有内容不能发布哦',
        content: '重新提交/或检查发票号',
        showCancel: false,
      })
    }
    that.onLoad();
  },

  onCounterInc: function () {
    const db = wx.cloud.database()
    const newCount = this.data.count + 1
    const _ = db.command
    db.collection('counters').doc('66c996965dda3302000af3bb51668818').update({
      data: {
        // 表示指示数据库将字段自增 1
        count: _.inc(1)
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  //数据保存到集合
  saveDataToServer: function (event) {
    var that = this;
    const db = wx.cloud.database();
    const Test = db.collection('counters');

    db.collection('counters').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        number: that.data.number,
        bill_code: that.data.bill_code,
        bill_num: that.data.bill_num,
        bill_amount: that.data.bill_amount,
        bill_date: that.data.bill_date,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        // 清空，然后重定向到首页
        console.log("success---->" + res)

        // 清空数据
        that.data.number = " ";
        that.data.bill_code = " ";
        that.data.bill_num = " ";
        that.data.bill_amount = " ";
        that.data.bill_date = " ";

        that.setData({
          number: [],
          bill_code: [],
          bill_num: [],
          bill_amount: [],
          bill_date: [],
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
      title: '数据add successful',
    })
    console.log("============")
  },


  /**
   * 页面的初始数据
   */
  data: {
    number: [],
    ne: [],
    name: "ZJD",
    done: true,
  },

  /**
 * 历史发票记录跳转
 */
  record: function () {
    console.log("fsdfsd")
    wx.navigateTo({
      url: '../record/record'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'lbc-r1n9w'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('counters').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
      }
    })
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
