module.exports = function validateForm(name, mobile, hustid){
    //judge Form legitimacy

    var phonenum = /^\d{11}$/;
    // var chinese_name = /^[\u4e00-\u9fa5]{2,8}$/;
    if (name === null || x ==="")
    {
        return false;
    }
    else if(mobile.length === 0|| !phonenum.test(mobile))
    {
        return false;
    }
    else if(hustid === 0|| hustid.length!=10)
    {
        return false;
    }
    //todo:根据mobile字段查出这条数据下mobile字段的值 若为空则返回TRUE否则返回null
    //goal : 查找是否恶意重复提交表单
    else {return true;}
}
