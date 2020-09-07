// page/deptdept.js
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        deptRoot: "../../image/dept/",
        fileRoot: app.globalData.cloudFileRoot,
        location: app.globalData.location
    },
    methods: {
        onTapNav(e) {
            const c = e.currentTarget.dataset.curr;
            this.triggerEvent("tapnav", {
                curr: 1
            }, {});
        },
        toLoc(e) {
            wx.openLocation(this.data.location[e.currentTarget.dataset.loc]);
        }
    }
});