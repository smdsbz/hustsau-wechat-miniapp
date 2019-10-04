// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "test-x2eg6",
  traceUser: true
});
const db = cloud.database();
const XLSX = require("xlsx");
const collect = db.collection("0908");

async function addUpRecords(){
  var lines = await collect.count();
  // get cell data
  const loopCycle = Math.ceil(lines.total / 100);
  const cellData = [];

  for (let i = 0; i < loopCycle; i++) {
    const promise = await collect.skip(i * 100).limit(100).get()
    cellData.push(promise);
  }

  return (await Promise.all(cellData)).reduce((arr, cur) => {
    return {
      data: arr.data.concat(cur.data),
      errMsg: arr.errMsg,
    }
  }
  );
}
// 云函数入口函数
exports.main = async (event, context) => {
  const allRecords =  await addUpRecords();

  var cellData = allRecords.data.reduce((arr, cur) => {
    arr.push([
      cur.name, cur.mobile, cur.gender,
      cur.firstDepartmentChoice,
      cur.secondDepartmentChoice,
      cur.birthday, cur.studentId, cur.birthPlace.toString(),
      cur.apartment, cur.facultyAndClass, cur.email,
      cur.hobbies,
      cur.formerExperience, cur.selfExplanation, cur.expectations
    ]);
    return arr;
  },

    [
      ["姓名", "电话", "性别", "第一志愿", "第二志愿", "生日", "学号", "籍贯", "宿舍地址", "专业班级", "电子邮箱", "爱好特长", "实践经历", "自我评价", "期待"]
    ]);



var worksheet = XLSX.utils.aoa_to_sheet(cellData);
console.log("[ws]", worksheet);

// begin create workbook
var workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "导出数据");
workbook.Props = {
  Title: "报名情况",
  Author: "思存工作室",
  Company: "HUSTAU"
};
console.log("[wb]", workbook);
// end create workbook

// write to Buffer
var buf = XLSX.write(workbook, {
  type: "buffer",
  bookType: "xlsx"
});
//console.log(buf);
var month;
month=
new Date().getMonth()+1;
var date=new Date().getDate();

return await cloud.uploadFile({
  // cloudPath: nameStr + ".xlsx",
  
  cloudPath: "数据导出"+month.toString()+"月"+date.toString()+"日"+".xlsx",
  fileContent: buf
});

}
