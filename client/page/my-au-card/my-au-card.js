// page/my-au-card/my-au-card.js
const CONFIG = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceProviders:['周黑鸭','麦当劳','秀玉红茶坊'],
    membershipVerified: false
  },

  AUMemberLogin:function(e){
    var formdata = e.detail.value;
    //Data legality checks
    if (!formdata["name"].length || !formdata["association"].length ) {
      wx.showModal({
        title: "信息不完整",
        content: "请检查您的信息是否填写完整！",
        showCancel: false,
        confirmText: "回去修改"
      });
      return;}

    if (! /^U20\d{7}$/.test(formdata["student-id"])) {
        wx.showModal({
          title: "信息格式不正确",
          content: "请检查您的学号是否正确填写！",
          showCancel: false,
          confirmText: "回去修改"
        });
        return;}
    console.log(formdata);
    wx.showLoading({
      title: '正在提交',
      mask: true,       // prevent unwanted touch event
    });

    // send the data
    wx.request({
      url: `${CONFIG.database_host}/api/au-card`,
      method: 'POST',
      data: formdata,
      success: (data) => {
        // `data` is server return
        // `data.data` is server-returned value!
        console.log(data);
        switch (data.data.code) { // careful with `data.data`
          case 0: {
            // wx.showModal({
            //   title: "认证成功",
            //   content: "即将显示社团卡",
            //   showCancel: false,
            //   confirmText: "确认"
            //   });
            wx.showToast({
                title: '认证成功！',
                icon: 'success',
                duration: 2000
            });
            this.setData({membershipVerified : true})
            break;
          }
          case 200: {
            wx.showModal({
              title: "提交成功",
              content: "您的信息已加入审批队列！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          case 900: {
            wx.showModal({
              title: "认证不成功",
              content: "您的申请信息可能正在审理中！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          case 901: {
            wx.showModal({
              title: "提交失败",
              content: "出现未知错误！请联系招新工作人员！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          case 902: {
            wx.showModal({
              title: "认证不成功",
              content: "您的信息可能不正确，请重试！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          default: {
            wx.showModal({
              title: "提交失败",
              content: "出现未知错误！请联系招新工作人员！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
        }
      },
      complete: (data) => {
        // console.log(data);
      }
    });
    wx.hideLoading();

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
