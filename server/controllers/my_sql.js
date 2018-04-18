const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  var new_data = {
    idx: null,
    name: ctx.request.body.name,
    gender: ctx.request.body.gender,
    mobile: ctx.request.body.mobile,
    "first-department-choice": ctx.request.body["first-department-choice"]
  }
  await mysql("join_us").insert(new_data).catch(error =>{
    console.error(error);
    ctx.body = {
            code: -1,
            error: "unable to insert"
        }
  })
 //  try {
 //
 //     }
 // } catch (e) {
 //     // catch 住全局的错误信息
 //     debug('Catch Error: %o', e)
 //
 //     // 设置状态码为 200 - 服务端错误
 //     ctx.status = 200
 //
 //     // 输出详细的错误信息
 //     ctx.body = {
 //         code: -1,
 //         error: e && e.message ? e.message : e.toString()
 //     }
 // }
  res = await mysql('join_us').select('*')
  // TODO: handle errors and fetch it to the frontend
  // // 改
  // await mysql("Book").update({ price: 66 }).where({ id })
  // // 删
  // await mysql("Book").del().where({ id })

  ctx.state.data = {
       msg: res
   }
}
