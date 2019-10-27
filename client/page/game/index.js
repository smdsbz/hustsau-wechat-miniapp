import Game from './Game';

Page({
  // 跟react的state是一个道理
  data: {
    status: 0,  // 0游戏未开始，1已开始，2已结束
    hasUserInfo:false
  },

  // 传给子组件的回调
  changeStatus: function (status) {
    this.setData({ status });
  },

  onLoad: function (e) {
    
  },

  onReady: function (e) {

    
    let gameConfig = { statusCallback: this.changeStatus };
    let that = this;

    wx.getSetting({
      success(res) {
          if (res.authSetting["scope.userInfo"]) {
              // 已授权,可以直接调用 getUserInfo
              that.setData({hasUserInfo:true});
          } else {
              
          }
      }
  });
      // 获取屏幕的宽高信息
    wx.getSystemInfo({
      success: function (res) {
        console.debug('screen width = %d, height = %d', res.windowWidth, res.windowHeight);
        gameConfig.canvasWidth = res.windowWidth;
        gameConfig.canvasHeight = res.windowHeight / 2;
      },
      complete: function () {
        let game = new Game(gameConfig);
        that.game = game;
        // that.game.setUserInfo(that.data.userInfo);
      }
    });


  },

  // 处理按钮按下的事件
  handleTouchStart: function (event) {
    if (this.data.status == 1)
      this.game.up();
  },

  // 处理按钮放开的事件
  handleTouchEnd: function (event) {
    if (this.data.status == 0)
      this.game.start();
    else if (this.data.status == 1)
      this.game.down();
    else if (this.data.status == 2)
      this.game.start();
  },

  navToleaderboards: function () {
    wx.navigateTo({
      url: 'leaderboards/leaderboards',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onGotUserInfo: function (e) {
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
    this.setData({userInfo: e.detail.userInfo})
    // console.log(this.data.userInfo)
  },
})
