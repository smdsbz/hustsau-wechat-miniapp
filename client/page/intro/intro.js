// page/intro/intro.js
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        fileRoot: app.globalData.cloudFileRoot,
        location: app.globalData.location,
        mascotAnim: {},
        mascotIdx: 0
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
        },
        changeMascot() {
            const mascotIdx = (this.data.mascotIdx + 1) % 3;
            console.log("[mascotIdx]", mascotIdx);
            let animation = wx.createAnimation({
                duration: 600,
                timingFunction: "ease",
            }); // 抖动动画
            animation.rotate(12).step().rotate(-12).step();
            animation.rotate(-12).step().rotate(12).step();

            this.setData({
                mascotAnim: animation.export(),
                mascotIdx
            });
        }
    }
});