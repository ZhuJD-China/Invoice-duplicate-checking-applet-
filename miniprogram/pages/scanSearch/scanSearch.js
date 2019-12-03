//定义db为晕数据库对象
// 1. 获取数据库引用
wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
const app = getApp();
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
    const Test = db.collection('scan');
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
    this.data.bill_code15 = e.detail.value['input-bill_code15'];
    this.data.bill_code16 = e.detail.value['input-bill_code16'];
    this.data.bill_code17 = e.detail.value['input-bill_code17'];
    this.data.bill_code18 = e.detail.value['input-bill_code18'];
    this.data.bill_code19 = e.detail.value['input-bill_code19'];
    this.data.bill_code20 = e.detail.value['input-bill_code20'];

    this.data.Value1 = e.detail.value['input-Value1'];
    this.data.Value2 = e.detail.value['input-Value2'];
    this.data.Value3 = e.detail.value['input-Value3'];
    this.data.Value4 = e.detail.value['input-Value4'];
    this.data.Value5 = e.detail.value['input-Value5'];
    this.data.Value6 = e.detail.value['input-Value6'];
    this.data.Value7 = e.detail.value['input-Value7'];
    this.data.Value8 = e.detail.value['input-Value8'];
    this.data.Value9 = e.detail.value['input-Value9'];
    this.data.Value10 = e.detail.value['input-Value10'];
    this.data.Value11 = e.detail.value['input-Value11'];
    this.data.Value12 = e.detail.value['input-Value12'];
    this.data.Value13 = e.detail.value['input-Value13'];
    this.data.Value14 = e.detail.value['input-Value14'];
    this.data.Value15 = e.detail.value['input-Value15'];
    this.data.Value16 = e.detail.value['input-Value16'];
    this.data.Value17 = e.detail.value['input-Value17'];
    this.data.Value18 = e.detail.value['input-Value18'];
    this.data.Value19 = e.detail.value['input-Value19'];
    this.data.Value20 = e.detail.value['input-Value20'];



    // 查询当前用户所有的 scan
    db.collection('scan').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          scan: res.data
        })
        // console.log('[数据库] [查询记录] 成功: ', res)
        console.log('scan.length:  ' + this.data.scan.length);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    if (this.data.bill_code1.trim() != '' && this.data.bill_code2.trim() != '') {

      //如果历史记录为0条
      if (this.data.scan.length == 0) {
        this.saveDataToServer();

      }


      //如果历史记录不为0条需要查重
      if (this.data.scan.length != 0) {

        for (i = 0; i < this.data.scan.length; i++) {
          //用来查重的字段
          if ((this.data.Value10 == this.data.scan[i].Value10 && this.data.bill_code10 == this.data.scan[i].bill_code10) || (this.data.Value9 == this.data.scan[i].Value9 && this.data.bill_code9 == this.data.scan[i].bill_code9) ) {
            count = 100;
            console.log("found same");

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
    var i=0;
    const db = wx.cloud.database();
    const Test = db.collection('scan');

    db.collection('scan').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        Value1: that.data.Value1,
        Value2: that.data.Value2,
        Value3: that.data.Value3,
        Value4: that.data.Value4,
        Value5: that.data.Value5,
        Value6: that.data.Value6,
        Value7: that.data.Value7,
        Value8: that.data.Value8,
        Value9: that.data.Value9,
        Value10: that.data.Value10,
        Value11: that.data.Value11,
        Value12: that.data.Value12,
        Value13: that.data.Value13,
        Value14: that.data.Value14,
        Value15: that.data.Value15,
        Value16: that.data.Value16,
        Value17: that.data.Value17,
        Value18: that.data.Value18,
        Value19: that.data.Value19,
        Value20: that.data.Value20,
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
        bill_code15: that.data.bill_code15,
        bill_code16: that.data.bill_code16,
        bill_code17: that.data.bill_code17,
        bill_code18: that.data.bill_code18,
        bill_code19: that.data.bill_code19,
        bill_code20: that.data.bill_code20,

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
        that.data.bill_code15 = " ";
        that.data.bill_code16 = " ";
        that.data.bill_code17 = " ";
        that.data.bill_code18 = " ";
        that.data.bill_code19 = " ";
        that.data.bill_code20 = " ";
        that.data.Value1 = " ";
        that.data.Value2 = " ";
        that.data.Value3 = " ";
        that.data.Value4 = " ";
        that.data.Value5 = " ";
        that.data.Value6 = " ";
        that.data.Value7 = " ";
        that.data.Value8 = " ";
        that.data.Value9 = " ";
        that.data.Value10 = " ";
        that.data.Value11 = " ";
        that.data.Value12 = " ";
        that.data.Value13 = " ";
        that.data.Value14 = " ";
        that.data.Value15 = " ";
        that.data.Value16 = " ";
        that.data.Value17 = " ";
        that.data.Value18 = " ";
        that.data.Value19 = " ";
        that.data.Value20 = " ";




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
          bill_code15: [],
          bill_code16: [],
          bill_code17: [],
          bill_code18: [],
          bill_code19: [],
          bill_code20: [],

          Value1: [],
          Value2: [],
          Value3: [],
          Value4: [],
          Value5: [],
          Value6: [],
          Value7: [],
          Value8: [],
          Value9: [],
          Value10:[],
          Value11: [],
          Value12: [],
          Value13: [],
          Value14: [],
          Value16: [],
          Value17: [],
          Value18: [],
          Value19: [],
          Value20: [],
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
      url: '../scanQuery/scanQuery',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
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

  UploadImage() {
    var myThis = this
    var random = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: random + '.png',
          filePath: tempFilePaths, // 文件路径
          success: res => {
            wx.showLoading({ //展示加载接口
              title: '加载中...',
            });
            console.log(res.fileID)
            wx.cloud.callFunction({
              name: 'InvoiceIdentification',
              data: {

                fileID: res.fileID
              },

              success: res => {
                wx.hideLoading() //关闭加载中弹窗
                console.log(res.result.VatInvoiceInfos)
                myThis.setData({

                  bill_code1: res.result.VatInvoiceInfos[5].Name,
                  Value1: res.result.VatInvoiceInfos[5].Value,

                  bill_code2: res.result.VatInvoiceInfos[6].Name,
                  Value2: res.result.VatInvoiceInfos[6].Value,

                  bill_code3: res.result.VatInvoiceInfos[7].Name,
                  Value3: res.result.VatInvoiceInfos[7].Value,

                  bill_code4: res.result.VatInvoiceInfos[8].Name,
                  Value4: res.result.VatInvoiceInfos[8].Value,

                  bill_code5: res.result.VatInvoiceInfos[9].Name,
                  Value5: res.result.VatInvoiceInfos[9].Value,

                  bill_code6: res.result.VatInvoiceInfos[10].Name,
                  Value6: res.result.VatInvoiceInfos[10].Value,

                  bill_code7: res.result.VatInvoiceInfos[11].Name,
                  Value7: res.result.VatInvoiceInfos[11].Value,

                  bill_code8: res.result.VatInvoiceInfos[12].Name,
                  Value8: res.result.VatInvoiceInfos[12].Value,

                  bill_code9: res.result.VatInvoiceInfos[13].Name,
                  Value9: res.result.VatInvoiceInfos[13].Value,

                  bill_code10: res.result.VatInvoiceInfos[14].Name,
                  Value10: res.result.VatInvoiceInfos[14].Value,

                  bill_code11: res.result.VatInvoiceInfos[15].Name,
                  Value11: res.result.VatInvoiceInfos[15].Value,
                  
                  bill_code12: res.result.VatInvoiceInfos[16].Name,
                  Value12: res.result.VatInvoiceInfos[16].Value,

                  bill_code13: res.result.VatInvoiceInfos[17].Name,
                  Value13: res.result.VatInvoiceInfos[17].Value,

                  bill_code14: res.result.VatInvoiceInfos[18].Name,
                  Value14: res.result.VatInvoiceInfos[18].Value,

                  bill_code15: res.result.VatInvoiceInfos[19].Name,
                  Value15: res.result.VatInvoiceInfos[19].Value,

                  bill_code16: res.result.VatInvoiceInfos[20].Name,
                  Value16: res.result.VatInvoiceInfos[20].Value,

                  bill_code17: res.result.VatInvoiceInfos[21].Name,
                  Value17: res.result.VatInvoiceInfos[21].Value,

                  bill_code18: res.result.VatInvoiceInfos[22].Name,
                  Value18: res.result.VatInvoiceInfos[22].Value,

                  bill_code19: res.result.VatInvoiceInfos[23].Name,
                  Value19: res.result.VatInvoiceInfos[23].Value,

                  bill_code20: res.result.VatInvoiceInfos[24].Name,
                  Value20: res.result.VatInvoiceInfos[24].Value,

           


                })
                wx.hideLoading() //关闭加载中弹窗
                wx.showToast({ //显示弹窗
                  title: '识别成功',
                  icon: 'success',
                  duration: 500
                })
              },
            })


          },
          fail: err => { }
        })
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
  },
  // totextarea: function (event) {
  //   event.detail.value = this.data.bill_code1;
  // },

  Manually: function (event) {
    wx.navigateTo({
      url: '../scanQuery/scanQuery',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      env: 'lbc-r1n9w' //云函数环境
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
        //这一步很重要，给scan赋值，没有这一步的话，前台就不会显示值
        this.setData({
          scan: res.data
        })
        console.log(' this.data.scan.length ' + this.data.scan.length);
      }
    })
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

})