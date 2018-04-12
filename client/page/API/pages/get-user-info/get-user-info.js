var app = getApp()
Page({
  data: {
    hasUserInfo: false
  },
  getUserInfo: function () {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      console.log("in function _getUserInfo");
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          });
          console.log(res);
          that.update();
        },
        fail: () => {
          console.log("_getUserInfo failed");
        }
      });
      console.log("after function _getUserInfo");
    }
  },
  clear: function () {
    console.log("before clear");
    console.log(this.userInfo);
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  }
})
