// page/about-au/about-au.js
Page({

  toJoinUs: function () {
    wx.switchTab({
      url: '../join-us/join-us'
    })},

  to36Building: function () {
    // wx.switchTab({
    //   url: '../join-us/join-us'
    // });

    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //   }
    // });
    wx.openLocation({
      type: "wgs84",
      latitude: this.data.location["36Building"].lat,
      longitude: this.data.location["36Building"].lon,
      scale: 17,
      name: "36 号楼",
      address: "SicunStudio"
    })

  },

  toSUBuilding: function () {
    wx.openLocation({
      type: "wgs84",
      latitude: this.data.location["SUBuilding"].lat,
      longitude: this.data.location["SUBuilding"].lon,
      scale: 17,
      name: "大学生活动中心",
      address: "Room 611"
    })

  },

  /**
   * 页面的初始数据
   */
  data: {
    location: {
      '36Building': {
        lat: 30.516015,
        lon: 114.415886
      },
      'SUBuilding': {
        lat: 100,
        lon: 100
      }
    }
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

  }
})