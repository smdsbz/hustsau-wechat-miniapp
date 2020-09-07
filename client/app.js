const openIdUrl = require('./config').openIdUrl

App({
    onLaunch: function () {
        console.info("App Launch");
        if (!wx.cloud) {
            console.error("请使用 2.2.3 或以上的基础库以使用云能力");
            wx.showToast({
                title: "请升级微信以使用小程序",
                icon: "none",
                duration: 60000
            });
        } else {
            wx.cloud.init({
                traceUser: true,
                env: "release-mcwb0"
            });
        }

        // color UI bar height
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        });
    },
    onShow: function () {
        console.info("App Show");
    },
    onHide: function () {
        console.info("App Hide");
    },
    globalData: {
        hasLogin: false,
        openid: null,
        cloudFileRoot: "cloud://release-mcwb0.7265-release-mcwb0/",
        location: {
            building36: {
                address: "SicunStudio",
                latitude: 30.516015,
                longitude: 114.415886,
                name: "36 号楼",
                scale: 17,
                type: "wgs84"
            },
            buildingSU: {
                address: "Room 611",
                latitude: 30.514293,
                longitude: 114.414249,
                name: "大学生活动中心",
                scale: 17,
                type: "wgs84"
            }
        }
    },

    // lazy loading openid
    getUserOpenId(callback) {
        var self = this;
        if (self.globalData.openid) {
            callback(null, self.globalData.openid);
            return;
        }
        wx.login({
            success(data) {
                wx.request({
                    url: openIdUrl,
                    data: {
                        code: data.code
                    },
                    success(res) {
                        console.log('拉取openid成功', res)
                        self.globalData.openid = res.data.openid
                        callback(null, self.globalData.openid)
                    },
                    fail(res) {
                        console.error('拉取用户openid失败，将无法正常使用开放接口等服务', res)
                        callback(res)
                    }
                })
            },
            fail(err) {
                console.error('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
                callback(err)
            }
        })
    }
})