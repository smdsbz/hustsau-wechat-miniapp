// page/about-au/about-au.js
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        fileList: app.globalData.cloudFileList,
        location: app.globalData.location
    },
    methods: {
        onTapNav: function(e) {
            const c = e.currentTarget.dataset.curr;
            this.triggerEvent("tapnav", {curr: 1}, {});
        },
        toLoc: function(e) {
            wx.openLocation(this.data.location[e.currentTarget.dataset.loc]);
        }
    },
    lifetimes: {
        ready: function() {
            this.setData({
                fileList: app.globalData.cloudFileList
            });
        }
    }
});