// client/page/game/leaderboards/leaderboards.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // player: [{
    //   name: "hao",
    //   score: 114514
    // }, {
    //   name: "2",
    //   score: 114514
    // }, {
    //   name: "4",
    //   score: 114514
    // }]
  },

  get: function () {
    const app = getApp();
    const db = wx.cloud.database();
    const that = this

    db.collection("gameResult").orderBy("score", "desc").limit(50).get()
      .then(res => {
        that.setData({
          player: res.data
        })
        console.log("获取成功")
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get()
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