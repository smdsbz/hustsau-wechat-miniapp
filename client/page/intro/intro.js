// page/intro/intro.js
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        fileList: app.globalData.cloudFileList,
        location: {
            '36Building': {
                lat: 30.516015,
                lon: 114.415886
            },
            'SUBuilding': {
                lat: 30.514293,
                lon: 114.414249
            }
        }
    },
    methods: {
        onTapNav: function(e) {
            const c = e.currentTarget.dataset.curr;
            this.triggerEvent("tapnav", {
                curr: 1
            }, {});
        },
        to36Building: function() {
            wx.openLocation({
                type: "wgs84",
                latitude: this.data.location["36Building"].lat,
                longitude: this.data.location["36Building"].lon,
                scale: 17,
                name: "36 号楼",
                address: "SicunStudio"
            });
        },
        toSUBuilding: function() {
            wx.openLocation({
                type: "wgs84",
                latitude: this.data.location["SUBuilding"].lat,
                longitude: this.data.location["SUBuilding"].lon,
                scale: 17,
                name: "大学生活动中心",
                address: "Room 611"
            });
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