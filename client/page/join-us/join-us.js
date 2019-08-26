// page/join-us/join-us.js

// const CONFIG = require('../../config.js')
const app = getApp();
const db = wx.cloud.database();
const forms = db.collection("joinUs");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: "1990-01-01",
    today: new Date().toJSON().slice(0, 10),
    departments: ['请选择...', '社团财务监督委员会', '财务部', '秘书部', '人力资源部', '社团部', '行政监察部', 
    '社团外联企划部', '公共关系部', '外联部', '媒体部', '宣传部', '新媒体工作室', 
    '思存工作室','文艺拓展部'],
    birthday: new Date(new Date().getFullYear() - 18, 0, 2) // smdsbz: assuming they are all 18-years old
      .toJSON().slice(0, 10), 
    //star-du: use Jan 02 to ensure that after conversion we get 01-01 instead of 12-31
    firstChoice: 0, // smdsbz: pass `departments[firstChoice]` to back-end
    secondChoice: 0, //         `-1` for no second choice
    alternativeAllowed: true
  },

  /**
   * invoked when user changed pickers in front-end
   *   and YES, you have to change the displayed content **MANUALLY**
   *
   * Author:    smdsbz@GitHub.com
   *
   * Args:      e   - the picker element that triggered this event
   *
   * Return:    None
   */

  switch1: function (e) {
    this.setData({
      alternativeAllowed: e.detail.value
    });
  },

  bindBirthdayChange: function (e) {
    this.setData({
      birthday: e.detail.value
    });
  },

  bindRegionChange: function (e) {
    this.setData({
      birthPlace: e.detail.value
    });
  },

  bindDepartmentChange: function (e) {
    if (this.data.firstChoice != 0 // smdsbz: HACK: Don't delete `this`!
      &&
      e.detail.value == 0) {
      // smdsbz: you cannot choose ‘请选择...’ again, once you chose sth. else
      return;
    }
    if (e.target.id == "firstDepartmentChoice-picker") {
      this.setData({
        firstChoice: e.detail.value
      });
    } else if (e.target.id == "secondDepartmentChoice-picker") {
      this.setData({
        secondChoice: e.detail.value
      });
    }
  },

  // /**
  //  * submit to back-end data server
  //  *   NOTE: We don't have a data server at the time
  //  *   TODO: Apply for a new server after MVP is shown
  //  *
  //  * Author:    smdsbz@GitHub
  //  *
  //  * Args:      e   - the form that is being submitted
  //  *
  //  * Return:    form data in JSON
  //  */
  // submitApplicantionForm: function (e) {
  //   var formdata = e.detail.value;
  //   var phonenum = /^\d{11}$/;
  //   var chinese_name = /^[\u4e00-\u9fa5]{2,8}$/;
  //   console.log(formdata);

  //   // console.log(`${CONFIG.database_host}/api/app-form`);

  //   // wx.request({
  //   //   url: 'https://itxbu0dx.qcloud.la/api/app-form',
  //   //   method: 'POST',
  //   //   data: formdata,
  //   //   success: (data) => {
  //   //     console.log(data);
  //   //   }
  //   // })

  //   // Data legality checks
  //   // - empty name field
  //   // ADDITIONAL: Regexp check
  //   if (formdata["name"].length === 0 || !chinese_name.test(formdata["name"])) {
  //     wx.showModal({
  //       title: "信息不完整或有错误",
  //       content: "请检查您的姓名是否正确填写！",
  //       showCancel: false,
  //       confirmText: "回去修改"
  //     });
  //     return;
  //   }
  //   // - refuse to give gender
  //   if (formdata["gender"].length === 0) {
  //     wx.showModal({
  //       title: "信息不完整",
  //       content: "请填写您的性别！",
  //       showCancel: false,
  //       confirmText: "回去修改"
  //     });
  //     return;
  //   }
  //   // - refuse to provide tel. or invalid tel
  //   if (formdata["mobile"].length === 0 || !phonenum.test(formdata["mobile"])) {
  //     wx.showModal({
  //       title: "信息不完整或有错误",
  //       content: "请填写您的手机号码！我们将以短信的形式通知您面试地点！\n如已填写，检查下是否填错了？",
  //       showCancel: false,
  //       confirmText: "回去修改"
  //     });
  //     return;
  //   }
  //   // - choose one department at least
  //   if (formdata["firstDepartmentChoice"] === 0) {
  //     wx.showModal({
  //       title: "信息不完整",
  //       content: "请选择您要加入的部门！",
  //       showCancel: false,
  //       confirmText: "回去修改"
  //     });
  //     return;
  //   }
  //   // - if chose alternative department
  //   if (formdata["allow-alternative-department"] === true
  //     && formdata["firstDepartmentChoice"] === 0) {
  //     wx.showModal({
  //       title: "信息不完整",
  //       content: "请选择您的备选部门！\n或者取消勾选「是否服从调剂」！",
  //       showCancel: false,
  //       confirmText: "回去修改"
  //     });
  //     return;
  //   }

  //   wx.showLoading({
  //     title: '正在提交',
  //     mask: true,       // prevent unwanted touch event
  //   });

  //   // send the data
  //   wx.request({
  //     url: `${CONFIG.database_host}/api/app-form`,
  //     method: 'POST',
  //     data: formdata,
  //     success: (data) => {
  //       // `data` is server return
  //       // `data.data` is server-returned value!
  //       console.log(data);
  //       switch (data.data.code) { // careful with `data.data`
  //         case 200: {
  //           wx.showModal({
  //             title: "提交成功",
  //             content: "面试地点将以短信形式通知！",
  //             showCancel: false,
  //             confirmText: "确认"
  //           });
  //           break;
  //         }
  //         case 900: {
  //           wx.showModal({
  //             title: "提交失败",
  //             content: "请勿重复提交！",
  //             showCancel: false,
  //             confirmText: "确认"
  //           });
  //           break;
  //         }
  //         case 901: {
  //           wx.showModal({
  //             title: "提交失败",
  //             content: "出现未知错误！请联系招新工作人员！",
  //             showCancel: false,
  //             confirmText: "确认"
  //           });
  //           break;
  //         }
  //         default: {
  //           wx.showModal({
  //             title: "提交失败",
  //             content: "出现未知错误！请联系招新工作人员！",
  //             showCancel: false,
  //             confirmText: "确认"
  //           });
  //           break;
  //         }
  //       }
  //     },
  //     complete: (data) => {
  //       // console.log(data);
  //     }
  //   });
  //   wx.hideLoading();

  //   // console.log("Legit data! POST to back-end data server");
  // },


  /**
   * Check the infos in the form, and return an Object for submit
   * 
   * @param  {Object}data   The object form, typically from e.detail.value.
   *
   * @return {Object}formObj    A form that is checked. 
   *                          If there is any error, a 'err' property
   *                          will be found in the return Object.
   */
  toFormObject: function (data) {
    const phonenum = /^\d{11}$/;
    const chineseName = /^[\u4e00-\u9fa5]{2,8}$/;
    const departments = ['请选择...', '社团财务监督委员会', '财务部', '秘书部', '人力资源部', '社团部', '行政监察部', 
    '社团外联企划部', '公共关系部', '外联部', '媒体部', '宣传部', '新媒体工作室', 
    '思存工作室','文艺拓展部'];

    // trim and judge
    const trimArr = [
      ["name", "姓名"],
      ["gender", "性别"],
      ["mobile", "手机号码"]
    ];
    for (let i = 0; i < trimArr.length; i++) {
      data[trimArr[i][0]] = data[trimArr[i][0]].trim();
      if (!data[trimArr[i][0]]) return {
        err: "请填写" + trimArr[i][1]
      };
    }
    // end trim and judge

    if (data.firstDepartmentChoice == 0) return {
      err: "请填写您要加入的部门"
    }

    if (!(chineseName.test(data.name))) return {
      err: "请填写正确的中文姓名"
    };

    if (!(phonenum.test(data.mobile))) return {
      err: "请填写您的手机号码！我们将以短信的形式通知您面试地点！\n如已填写，检查下是否填错了？"
    };

    // - if allow alternative department
    if (data["allow-alternative-department"] == true &&
      data["secondDepartmentChoice"] == 0) return {
      err: "请选择您的备选部门！\n或者取消勾选「是否服从调剂」！"
    }

    if (!data["allow-alternative-department"])
      data.secondDepartmentChoice = null;

    return {
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
      studentId: data.studentId,
      birthPlace: data.birthPlace,
      apartment: data.apartment,
      facultyAndClass: data.facultyAndClass,
      email: data.email,
      mobile: data.mobile,
      firstDepartmentChoice: departments[data.firstDepartmentChoice],
      secondDepartmentChoice: departments[data.secondDepartmentChoice],
      hobbies: data.hobbies,
      formerExperience: data.formerExperience,
      selfExplanation: data.selfExplanation,
      expectations: data.expectations,
      submitDate: new Date(),
    }
  },

  /**
   * Submit the form to cloud database.
   */
  submitJoinUsForm: function (e) {
    var formsData = e.detail.value;
    console.log('formData',formsData);
    let formObj = this.toFormObject(formsData);
    console.log('formObj',formObj);
    // has error
    if (formObj.hasOwnProperty("err")) {
      wx.showModal({
        title: "提交失败",
        content: formObj.err,
        showCancel: false,
        confirmText: "再去改改"
      });
      return;
    }

    wx.showLoading({
      title: '正在提交',
      mask: true, // prevent unwanted touch event
    });

    /* 
    **TODO** 云开发实现
    查询表单中的手机号  -> 若数据库中无结果： 自动添加表单号（拟定格式 `19Fall00001`），
                            加入云开发数据库joinUs
                      -> 若已有相应表单，提示“请勿重复提交” 并返回 
    */
    db.collection("joinUs").orderBy("formid", "desc").limit(3).get()
      .then(res => {
        console.log('res', res.data);
        let prefix = (new Date().getFullYear() - 2000) + (1 < new Date().getMonth() < 8 ? "Spri" : "Fall")
        let newFormNumber = "00001";
        if (res.data[0] && res.data[0].formid.slice(0,6) == prefix ) 
        newFormNumber = (res.data[0].formid.slice(6,11) * 1 + 100001).toString().slice(1, 6); 
        //NOTE: "abc".slice(0,2) = "ab" not "abc" !
        // console.log("[max formid]", maxFormid);
        // formObj.formid = "19Fall" + ((maxFormid.slice(6, 11)) * 1 + 100001).toString().slice(1, 6);
        formObj.formid = prefix + newFormNumber;
        console.log("[formObj]", formObj);

        db.collection("joinUs").where({
          mobile: formObj.mobile
        }).get()
        .then(res => {
          // console.log(res);
          if (res.data.length !== 0) {
            wx.showModal({
              title: "请勿重复提交",
              content: "手机号重复",
              showCancel: false,
              confirmText: "再去改改"
            });
            wx.hideLoading()
          } else {
            // console.log(res);
            db.collection("joinUs")
              .add({
                data: formObj
              })
              .then(() => {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success'
                });
                wx.hideLoading();
              })
          }
        })
        
      })




    // wx.hideLoading();

  },

  bindAlterChange: function (e) {

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