Page({

  data: {
    formid: '',
    code: ''

  },

  bindsubmit: function (e) {
    console.log(e)
    this.setData({
      formid: e.detail.formId,
      code: getApp().globalData.code
    })
  }
})