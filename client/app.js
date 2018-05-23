App({
  globalData: {
    code: null,
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.login({
      success: (e) => {
        console.log(e)
        this.globalData.code = e.code
      }
    })
  },


})
