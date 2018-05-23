//全局的getApp()函数，获取到小程序实例
var app = getApp()
Page({
  data: {
    today: "",
    tomorrow: "",
    finalDate: ""
  },
  //页面载入，初始化日期，这段代码不是必须的，用于展示js的prototype方法机制
  onLoad: function () {
    let today = new Date();
    let tomorrow = new Date();
    let finalDate = new Date();
    Date.prototype.getCHNDateString = function () {
      return this.getFullYear() + "-" + (this.getMonth() + 1 + "").padStart(2, "0") + "-" + this.getDate()
    }
    Date.prototype.addMonth = function (value) {
      var month = this.getMonth()
      this.setMonth(month + value)
    }
    Date.prototype.addDate = function (value) {
      var date = this.getDate()
      this.setDate(date + value)
    }
    tomorrow.addDate(1)     //离店日期最早时明天
    finalDate.addMonth(3)   //只能预订三个月以内的房间
    this.setData({
      today: today.getCHNDateString(),
      tomorrow: tomorrow.getCHNDateString(),
      finalDate: finalDate.getCHNDateString()
    })
  },
  //表单提交
  formSubmit: function (e) {
    var orderno = e.detail.value.orderNo
    var orderdatebegin = e.detail.value.orderDateBegin
    var orderdateend = e.detail.value.orderDateEnd
    var ordername = e.detail.value.orderName
    var ordertel = e.detail.value.orderTel
    var formid = e.detail.formId
    console.log(e.detail.formId)
    //校验输入非空
    if (orderno == "" || orderdatebegin == "" || orderdateend == "" || ordername == "" || ordertel == "") {
      wx.showModal({
        title: '提示',
        content: '不能为空！'
      })
    } else if (orderdatebegin >= orderdateend) {
      wx.showModal({
        title: '提示',
        content: '离店日期要晚于入住日期'
      })
    }
    else {

      wx.request({
        url: 'https://wrysj9ff.qcloud.la/openid.php',    //服务器信息
        data: {
          code: app.globalData.code,
          FORMID: formid,
          datebegin: orderdatebegin,
          dateend: orderdateend,
          no: orderno,
          name: ordername,
          tel: ordertel,
          appid: 'wx55024836da23d7c4',
          appsecret: '10d6e52191e3812bc42088635a5393d6',
          templateid: 'pQu9gVmhNmS9XflRgyxkics4a7syoFgs9WcVr5z106w'
        },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: res.errMsg,
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },
  //表单重置
  formReset: function () {
    this.setData({
      dateBegin: '',
      dateEnd: ''
    })
  },
  //日期选择
  bindDateChange: function (e) {
    if (e.target.id == "dateBegin") {
      this.setData({
        dateBegin: e.detail.value
      })
    } else {
      this.setData({
        dateEnd: e.detail.value
      })
    }
  }
})