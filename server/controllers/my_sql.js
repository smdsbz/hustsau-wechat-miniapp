const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
//   var id = uuid.v1()
  // 增
  // var  addSqlParams = ['测试', 'male', '18200000000', '思存工作室'];
  // var new_data = {
  //   idx: id,
  //   name: "测试",
  //   gender: 'male',
  //   mobile: '18200000000',
  //   first-department-choice: '思存工作室'
  // }
  // await mysql("join_us").insert(new_data)
  // 查
  res = await mysql('book').select('*').where({ id: 1 })
  // // 改
  // await mysql("Book").update({ price: 66 }).where({ id })
  // // 删
  // await mysql("Book").del().where({ id })

  ctx.state.data = {
       msg: res
   }
}
