const openIdUrl = require('./config').openIdUrl

App({
    onLaunch: function() {
        console.log('App Launch')
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

        (async() => {
            let cloudFileKey = Object.keys(this.globalData.cloudFileList),
                cloudFileString = [];
            for (let i of cloudFileKey)
                cloudFileString.push(this.globalData.cloudFileList[i].fileID);
            await wx.cloud.getTempFileURL({
                fileList: cloudFileString
            }).then(res => {
                // get temp file URL
                for (let i in res.fileList)
                    this.globalData.cloudFileList[cloudFileKey[i]].url =
                        res.fileList[i].tempFileURL;
            });
        })();

    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        openid: null,
        cloudFileList: {
            "img/cardBg.jpg": {
                fileID: "cloud://release-mcwb0.7265-release-mcwb0-1256427422/img/cardBg.png",
                url: "https://7265-release-mcwb0-1256427422.tcb.qcloud.la/img/cardBg.png"
            }
        },
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
    getUserOpenId: function(callback) {
        var self = this

        if (self.globalData.openid) {
            callback(null, self.globalData.openid)
        } else {
            wx.login({
                success: function(data) {
                    wx.request({
                        url: openIdUrl,
                        data: {
                            code: data.code
                        },
                        success: function(res) {
                            console.log('拉取openid成功', res)
                            self.globalData.openid = res.data.openid
                            callback(null, self.globalData.openid)
                        },
                        fail: function(res) {
                            console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
                            callback(res)
                        }
                    })
                },
                fail: function(err) {
                    console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
                    callback(err)
                }
            })
        }
    }
})