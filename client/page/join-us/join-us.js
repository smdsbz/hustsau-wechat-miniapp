// page/join-us/join-us.js
const app = getApp();
const dbcol = wx.cloud.database().collection("joinUs2020Spri");

Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        fileList: app.globalData.cloudFileList,
        startDate: "1990-01-01",
        today: new Date().toJSON().slice(0, 10),
        departments: [
            '社团财务监督委员会', '办公室', '人力资源部', '社团部', '行政监察部',
            '外联企划部', '媒体部', '宣传部', '新媒体工作室', '思存工作室', '文艺拓展部'
        ],
        birthday: new Date(new Date().getFullYear() - 18, 0, 2).toJSON().slice(0, 10),
        // smdsbz: assuming they are all 18-years old
        //star-du: use Jan 02 to ensure that after conversion we get 01-01 instead of 12-31
        firstChoice: null, // smdsbz: pass `departments[firstChoice]` to back-end
        secondChoice: null, // `-1` for no second choice
        alternativeAllowed: true,
        apartmentArray: ["韵苑", "紫菘", "沁苑"],
        apartmentIndex: null,
        birthplace: ["湖北省", "武汉市", "洪山区"],
        submitBtnDisabled: false
    },
    lifetimes: {
        ready: function() {
            this.setData({
                fileList: app.globalData.cloudFileList
            });
        }
    },
    methods: {
        bindAlterChange: function(e) {
            console.log(e.detail.value);
            this.setData({
                alternativeAllowed: e.detail.value
            });
        },
        bindApartmentChange: function(e) {
            console.log(e.detail.value);
            this.setData({
                apartmentIndex: e.detail.value
            });
        },
        bindBirthdayChange: function(e) {
            console.log(e.detail.value);
            this.setData({
                birthday: e.detail.value
            });
        },
        bindBirthplaceChange: function(e) {
            console.log(e.detail.value);
            this.setData({
                birthplace: e.detail.value
            });
        },
        bindDepartment1Change: function(e) {
            console.log(e.detail.value);
            this.setData({
                firstChoice: e.detail.value
            });
        },
        bindDepartment2Change: function(e) {
            console.log(e.detail.value);
            this.setData({
                secondChoice: e.detail.value
            });
        },

        /**
         * Submit the form to cloud database.
         */
        submitJoinUsForm: function(e) {
            let formsData = e.detail.value;
            console.log('formData', formsData);
            let formObj = this.toFormObject(formsData);
            console.log('formObj', formObj);
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
            this.setData({
                submitBtnDisabled: true
            });
            wx.showLoading({
                title: "正在提交",
                mask: true // prevent unwanted touch event
            });

            dbcol.orderBy("formid", "desc").limit(3).get()
                .then(res => {
                    console.log('res', res.data);
                    let prefix = (new Date().getFullYear() - 2000) + (1 < new Date().getMonth() && new Date().getMonth() < 8 ? "Spri" : "Fall");
                    let newFormNumber = "00001";
                    if (res.data[0] && res.data[0].formid.slice(0, 6) == prefix)
                        newFormNumber = (res.data[0].formid.slice(6, 11) * 1 + 100001).toString().slice(1, 6);
                    //NOTE: "abc".slice(0,2) = "ab" not "abc" !
                    // formObj.formid = "19Fall" + ((maxFormid.slice(6, 11)) * 1 + 100001).toString().slice(1, 6);
                    formObj.formid = prefix + newFormNumber;
                    console.log("[formObj]", formObj);
                    this.submitFormidDone(formObj);
                });
        },
        /**
         * Check the infos in the form, and return an Object for submit
         * 
         * @param  {Object}data   The object form, typically from e.detail.value.
         *
         * @return {Object}formObj    A form that is checked. 
         *                          If there is any error, a 'err' property
         *                          will be found in the return Object.
         */
        toFormObject(data) {
            const deptm = this.data.departments;

            // trim and judge
            const trimArr = [
                ["name", "姓名", /^[\u4e00-\u9fa5·]{2,10}$/],
                ["studentId", "学号", /^[UMD]?\d{9}$/],
                ["facultyAndClass", "专业班级"],
                ["mobile", "手机号码", /^\d{11}$/]
            ];
            for (let i = 0; i < trimArr.length; i++) {
                data[trimArr[i][0]] = data[trimArr[i][0]].trim();
                if (!data[trimArr[i][0]]) {
                    return {
                        err: "请填写" + trimArr[i][1]
                    };
                } else if (trimArr[i].length == 3) {
                    if (!trimArr[i][2].test(data[trimArr[i][0]])) {
                        return {
                            err: "未按格式填写" + trimArr[i][1]
                        };
                    }
                }
            }
            // end trim and judge

            if (data.firstDepartmentChoice === null) return {
                err: "请填写您要加入的部门"
            }

            if (this.data.apartmentIndex == null) return {
                err: "请填写宿舍地址"
            }

            /*if (!(chineseName.test(data.name))) return {
                err: "请填写正确的中文姓名"
            };
            if (!(phonenum.test(data.mobile))) return {
                err: "请填写您的手机号码！我们将以短信的形式通知您面试地点！\n如已填写，检查下是否填错了？"
            };*/

            // - if allow alternative department
            if (data.allowAlterDepartment && data.secondDepartmentChoice === null)
                return {
                    err: "请选择您的备选部门！\n或者取消勾选「是否服从调剂」！"
                }

            if (!data["allow-alternative-department"])
                data.secondDepartmentChoice = null;

            return {
                apartment: this.data.apartmentArray[this.data.apartmentIndex],
                birthday: data.birthday,
                birthPlace: data.birthplace,
                email: data.email,
                facultyAndClass: data.facultyAndClass,
                gender: data.gender ? "male" : "female",
                mobile: data.mobile,
                name: data.name,
                studentId: data.studentId,

                firstDepartmentChoice: deptm[data.firstDepartmentChoice],
                secondDepartmentChoice: data.allowAlterDepartment ? deptm[data.secondDepartmentChoice] : "不服从调剂",

                hobbies: data.hobbies,
                formerExperience: data.formerExperience,
                selfExplanation: data.selfExplanation,
                expectations: data.expectations,
                submitDate: new Date()
            }
        },

        submitFormidDone(formObj) {
            dbcol.where({
                    mobile: formObj.mobile
                }).get()
                .then(res => {
                    // console.log(res);
                    this.setData({ submitBtnDisabled: false });
                    if (res.data.length !== 0) {
                        wx.showModal({
                            title: "请勿重复提交",
                            content: "手机号重复",
                            showCancel: false,
                            confirmText: "再去改改"
                        });
                        wx.hideLoading();
                    } else {
                        // console.log(res);
                        dbcol.add({
                                data: formObj
                            })
                            .then(() => {
                                wx.showModal({
                                    title: "提交成功",
                                    content: "你已成功提交报名表！",
                                    showCancel: false,
                                    confirmText: "确认"
                                });
                                wx.hideLoading();
                            })
                    }
                })
        }
    }
});