// client/page/main/main.js
Page({
    data: {
        pageName: ["menu", "join", "info"],
        pageTitle: ["关于社指", "加入我们", "部门介绍"],
        curr: 0
    },
    navSelect(e) {
        // console.log("navSelect",e);
        const c = e.currentTarget.dataset.curr || e.detail.curr;
        // console.log(c);
        if (c >= 0 && c <= this.data.pageTitle.length) {
            this.setData({
                curr: c
            });
        }
    },
    /**
     * share app
     * @param {Object} res 
     */
    onShareAppMessage: function (res) {
        return {
            title: "Hustsau Entrance",
            path: "/page/main/main"
        }
    }
});