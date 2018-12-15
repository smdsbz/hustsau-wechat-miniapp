// page/my-au-card/my-au-card.js
const CONFIG = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {array :[{serviceProviders:'猫眼眼镜(华科西区店)',
    type:"眼镜店", address:"华中科技大学西校区紫菘路", 
    tel:"18672759009", content:"在商家处消费时，在原有折扣基础上再打八折（特价商品仅打九折）"},
    {serviceProviders:'美拉维苏披萨店',
    type:"披萨店", address:"华中科技大学东校区绝望坡", 
    tel:"18372741881", content:"在商家处消费均可享受8折的优惠价"},
    {serviceProviders:'茗益滋奶茶店',
    type:"奶茶店", address:"华中科技大学东校区", 
    tel:"15377653362", content:"1）在商家处购买物品时打8.8折。\n "
    +"2）在活动时间内支持团购，单次消费10杯以上时享受八折优惠"},
    {serviceProviders:"私品茶道（华科店）",type:"奶茶店",address:"湖北省武汉市洪山区珞瑜路华中科技大学东校区韵苑生活区",
    tel:"18607133051",content:"在购买指定优惠商品时进行88折处理"},
    {serviceProviders:"蔡明纬（小碗菜）(佳园路店)",type:"饭店",
    address:"洪山区佳园路华光大厦北50米",tel:"18062028332",
    content:"乙方持卡成员凭社团卡（电子卡）到甲方商铺中免费办理会员卡（实体卡），并通过会员卡直接到甲方商铺中刷卡消费(会员卡中充值100元送15元，充值200元送40元，充值500元送120元)"},
    {serviceProviders:"隆昌照相馆",type:"照相馆",
    address:"湖北省武汉市洪山区珞瑜东路415附16号",tel:"65388864",
    content:"对持卡成员消费的指定优惠物品进行88折处理"},
    {serviceProviders:"东北饺子馆（珞瑜东路）",type:"饭店",
    address:"洪山区珞瑜东路",tel:"13554306718",
    content:"1）：除冬至日外在甲方商铺中消费时享受满减优惠（消费满30元减3，满50减5，满100减10，满200减20）\n\n"},
    {serviceProviders:"唯可多欢乐餐厅",type:"自主餐厅",
    address:"光谷步行街一期（现代风情街中影天河影城楼上）五楼",tel:"027-87557820",
    content:"普通工作日43元，周六日及节假日49元，需携带学生证"},
    {serviceProviders:"泡面小食堂",type:"饭店",address:"光谷步行街加州阳光美食街SL58—59",
    tel:"15067509866",content:"在商家处消费时，可享受88折的优惠"},
    {serviceProviders:"精武鸭脖",type:"食品店",address:"武汉市洪山区关山街道鲁磨路盈龙科技大厦1楼",
    tel:"15827036816",content:"精武路产品均可享受9折的优惠"},
    {serviceProviders:"龙门花甲",type:"饭店",address:"光谷步行街四楼火星美食街A015龙门花甲",
    tel:"18971342345",content:"28元以上商品均可享受85折的优惠，28元及以下商品均可享受9折优惠（特价促销商品除外）"},

  ],
    membershipVerified: false
  },

  AUMemberLogin:function(e){
    var formdata = e.detail.value;
    //Data legality checks
    if (!formdata["name"].length || !formdata["association"].length ) {
      wx.showModal({
        title: "信息不完整",
        content: "请检查您的信息是否填写完整！",
        showCancel: false,
        confirmText: "回去修改"
      });
      return;}

    if (! /^U20\d{7}$/.test(formdata["student-id"])) {
        wx.showModal({
          title: "信息格式不正确",
          content: "请检查您的学号是否正确填写！",
          showCancel: false,
          confirmText: "回去修改"
        });
        return;}
    console.log(formdata);
    wx.showLoading({
      title: '正在提交',
      mask: true,       // prevent unwanted touch event
    });

    // send the data
    wx.request({
      url: `${CONFIG.database_host}/api/au-card`,
      method: 'POST',
      data: formdata,
      success: (data) => {
        // `data` is server return
        // `data.data` is server-returned value!
        console.log(data);
        switch (data.data.code) { // careful with `data.data`
          case 0: {
            // wx.showModal({
            //   title: "认证成功",
            //   content: "即将显示社团卡",
            //   showCancel: false,
            //   confirmText: "确认"
            //   });
            wx.showToast({
                title: '认证成功！',
                icon: 'success',
                duration: 2000
            });
            this.setData({membershipVerified : true})
            break;
          }
          case 200: {
            wx.showModal({
              title: "提交成功",
              content: "您的信息已加入审批队列！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          case 900: {
            wx.showModal({
              title: "认证不成功",
              content: "您的申请信息可能正在审理中！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          case 901: {
            wx.showModal({
              title: "提交失败",
              content: "出现未知错误！请联系招新工作人员！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          case 902: {
            wx.showModal({
              title: "认证不成功",
              content: "您的信息可能不正确，请重试！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
          default: {
            wx.showModal({
              title: "提交失败",
              content: "出现未知错误！请联系招新工作人员！",
              showCancel: false,
              confirmText: "确认"
            });
            break;
          }
        }
      },
      complete: (data) => {
        // console.log(data);
      }
    });
    wx.hideLoading();

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
